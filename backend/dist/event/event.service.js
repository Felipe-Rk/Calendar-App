"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./event.entity");
const user_entity_1 = require("../user/user.entity");
let EventService = class EventService {
    eventRepository;
    userRepository;
    constructor(eventRepository, userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }
    async createEvent(userId, description, start_time, end_time) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new Error('Usuário não encontrado');
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
    async getAllEvents(userId) {
        return await this.eventRepository.find({ where: { user: { id: userId } } });
    }
    async updateEvent(id, description, start_time, end_time) {
        const event = await this.eventRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!event)
            throw new Error('Evento não encontrado');
        const conflictingEvent = await this.eventRepository
            .createQueryBuilder('event')
            .where('event.userId = :userId', { userId: event.user.id })
            .andWhere('event.id != :eventId', { eventId: id })
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
    async deleteEvent(id) {
        const event = await this.eventRepository.findOne({ where: { id } });
        if (!event)
            throw new Error('Evento não encontrado');
        await this.eventRepository.remove(event);
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventService);
//# sourceMappingURL=event.service.js.map