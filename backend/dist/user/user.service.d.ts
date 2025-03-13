import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, password: string, email: string): Promise<User>;
    authenticate(username: string, password: string): Promise<string>;
    getAllUsers(excludeUserId: number): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
}
