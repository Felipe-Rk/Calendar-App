import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { User } from '../user/user.entity';
export declare class EventService {
    private eventRepository;
    private userRepository;
    constructor(eventRepository: Repository<Event>, userRepository: Repository<User>);
    createEvent(userId: number, description: string, start_time: Date, end_time: Date): Promise<Event>;
    getAllEvents(userId: number): Promise<Event[]>;
    updateEvent(id: number, description: string, start_time: Date, end_time: Date): Promise<Event>;
    deleteEvent(id: number): Promise<void>;
}
