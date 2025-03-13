// backend/src/event/event.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User])], // Importando as entidades que vamos usar
  providers: [EventService], // Definindo o EventService como provider
  controllers: [EventController], // Definindo o EventController
})
export class EventModule {}
