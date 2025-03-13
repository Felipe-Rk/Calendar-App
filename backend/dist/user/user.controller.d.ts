import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: {
        username: string;
        password: string;
        email: string;
    }): Promise<import("./user.entity").User>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    getAllUsers(excludeUserId: number): Promise<any>;
    getUserById(id: number): Promise<import("./user.entity").User>;
}
