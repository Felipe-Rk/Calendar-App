import { Controller, Post, Get, Param, Body, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(
    @Body() body: { userId: number; description: string; start_time: Date; end_time: Date },
  ) {
    try {
      const event = await this.eventService.createEvent(
        body.userId,
        body.description,
        new Date(body.start_time),
        new Date(body.end_time),
      );
      return { statusCode: 201, message: 'Evento criado com sucesso', event };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  async getAllEvents(@Param('userId') userId: number) {
    return this.eventService.getAllEvents(userId);
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: number,
    @Body() body: { description: string; start_time: Date; end_time: Date },
  ) {
    return this.eventService.updateEvent(id, body.description, body.start_time, body.end_time);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
}