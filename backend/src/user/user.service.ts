import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm'; // Importe o operador Not
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string, email: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });
    return await this.userRepository.save(user);
  }

  async authenticate(username: string, password: string): Promise<string> {
    console.log('Tentativa de login para o usuário:', username); // Log 1
  
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      console.error('Usuário não encontrado:', username); // Log 2
      throw new Error('User not found');
    }
  
    console.log('Usuário encontrado:', user); // Log 3
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Senha incorreta para o usuário:', username); // Log 4
      throw new Error('Invalid password');
    }
  
    console.log('Senha válida para o usuário:', username); // Log 5
  
    const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
    console.log('Token gerado:', token); // Log 6
  
    return token;
  }

  // Método para listar todos os usuários, exceto o usuário logado
  async getAllUsers(excludeUserId: number): Promise<User[]> {
    return this.userRepository.find({
      where: { id: Not(excludeUserId) }, // Exclui o usuário logado
    });
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email'], // Retorna apenas os campos necessários
    });
  
    return user || null; // Garante que retorna null se o usuário não existir
  }
  
}