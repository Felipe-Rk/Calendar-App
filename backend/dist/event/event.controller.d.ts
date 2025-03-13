import { EventService } from './event.service';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    createEvent(body: {
        userId: number;
        description: string;
        start_time: Date;
        end_time: Date;
    }): Promise<{
        statusCode: number;
        message: string;
        event: import("./event.entity").Event;
    }>;
    getAllEvents(userId: number): Promise<import("./event.entity").Event[]>;
    updateEvent(id: number, body: {
        description: string;
        start_time: Date;
        end_time: Date;
    }): Promise<import("./event.entity").Event>;
    deleteEvent(id: number): Promise<void>;
}
