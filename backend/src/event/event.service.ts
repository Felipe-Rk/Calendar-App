import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { User } from '../user/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Criar um evento
  async createEvent(
    userId: number,
    description: string,
    start_time: Date,
    end_time: Date,
  ): Promise<Event> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('Usuário não encontrado');

    // Verificar conflitos de horários
    const conflictingEvent = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.userId = :userId', { userId })
      .andWhere('(event.start_time < :end_time AND event.end_time > :start_time)', {
        start_time,
        end_time,
      })
      .getOne();

    if (conflictingEvent) {
      throw new Error('Conflito de horário com outro evento.');
    }

    const event = this.eventRepository.create({
      description,
      start_time,
      end_time,
      user,
    });
    return await this.eventRepository.save(event);
  }

  // Listar todos os eventos de um usuário
  async getAllEvents(userId: number): Promise<Event[]> {
    return await this.eventRepository.find({ where: { user: { id: userId } } });
  }

  // Atualizar um evento
  async updateEvent(
    id: number,
    description: string,
    start_time: Date,
    end_time: Date,
  ): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['user'], // Carregar o relacionamento com o usuário
    });
    if (!event) throw new Error('Evento não encontrado');

    // Verificar conflitos de horários (exceto o próprio evento)
    const conflictingEvent = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.userId = :userId', { userId: event.user.id })
      .andWhere('event.id != :eventId', { eventId: id }) // Ignorar o próprio evento
      .andWhere('(event.start_time < :end_time AND event.end_time > :start_time)', {
        start_time,
        end_time,
      })
      .getOne();

    if (conflictingEvent) {
      throw new Error('Conflito de horário com outro evento.');
    }

    event.description = description;
    event.start_time = start_time;
    event.end_time = end_time;
    return await this.eventRepository.save(event);
  }

  // Deletar um evento
  async deleteEvent(id: number): Promise<void> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new Error('Evento não encontrado');

    await this.eventRepository.remove(event);
  }
}