// // backend/src/user/user.controller.ts
// import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
// import { UserService } from './user.service';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post('register')
//   async register(
//     @Body() body: { username: string; password: string; email: string },
//   ) {
//     return this.userService.createUser(body.username, body.password, body.email);
//   }

//   @Post('login')
//   async login(@Body() body: { username: string; password: string }) {
//     console.log('Recebida requisição de login para o usuário:', body.username); // Log 7

//     try {
//       const token = await this.userService.authenticate(body.username, body.password);
//       console.log('Login bem-sucedido para o usuário:', body.username); // Log 8
//       return { token }; // Retorna o token como um objeto
//     } catch (error) {
//       console.error('Erro durante o login:', error.message); // Log 9
//       throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
//     }
//   }
// }


import { Controller, Post, Body, HttpStatus, HttpException, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; password: string; email: string },
  ) {
    return this.userService.createUser(body.username, body.password, body.email);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log('Recebida requisição de login para o usuário:', body.username); // Log 7

    try {
      const token = await this.userService.authenticate(body.username, body.password);
      console.log('Login bem-sucedido para o usuário:', body.username); // Log 8
      return { token }; // Retorna o token como um objeto
    } catch (error) {
      console.error('Erro durante o login:', error.message); // Log 9
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  async getAllUsers(@Query('excludeUserId') excludeUserId: number): Promise<any> {
    try {
      const users = await this.userService.getAllUsers(excludeUserId);
      return { statusCode: 200, data: users };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}