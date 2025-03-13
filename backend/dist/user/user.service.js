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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(username, password, email) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            email,
        });
        return await this.userRepository.save(user);
    }
    async authenticate(username, password) {
        console.log('Tentativa de login para o usuário:', username);
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            console.error('Usuário não encontrado:', username);
            throw new Error('User not found');
        }
        console.log('Usuário encontrado:', user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Senha incorreta para o usuário:', username);
            throw new Error('Invalid password');
        }
        console.log('Senha válida para o usuário:', username);
        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
        console.log('Token gerado:', token);
        return token;
    }
    async getAllUsers(excludeUserId) {
        return this.userRepository.find({
            where: { id: (0, typeorm_2.Not)(excludeUserId) },
        });
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'username', 'email'],
        });
        return user || null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map