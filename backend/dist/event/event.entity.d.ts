import { User } from '../user/user.entity';
export declare class Event {
    id: number;
    description: string;
    start_time: Date;
    end_time: Date;
    user: User;
}
