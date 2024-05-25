import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './events.schema'; 
import { CreateEventDto } from './events.createeventdto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Endpoint to get all events
  @Get()
  async getAllEvents(@Res() response) {
    const events = await this.eventsService.findAll();
    return response.status(HttpStatus.OK).json(events);
  }
  // Only for organisations
  @Post()
  async createEvent(@Res() response, @Body() createEventDto: CreateEventDto) {
    const result = await this.eventsService.createEvent(createEventDto);
    return response.status(HttpStatus.OK).json(result);
  }
  // Endpoint to join an event
  @Post('/join')
  async joinEvent(@Res() response, @Body() joinEventDto: any) {  // Define a DTO for join event if needed
    const result = await this.eventsService.joinEvent(joinEventDto);
    return response.status(HttpStatus.OK).json(result);
  }

  // Endpoint to get users who joined an event by event ID
  // Event ID is "_id"
  @Get('/joinedBy/:eventId')
  async getUsersJoinedByEvent(@Res() response, @Param('eventId') eventId: string) {
    const users = await this.eventsService.findUsersByEvent(eventId);
    return response.status(HttpStatus.OK).json(users);
  }

  // Endpoint to get events joined by a user
  @Get('/joinedByUser/:userEmail')
  async getEventsJoinedByUser(@Res() response, @Param('userEmail') userEmail: string) {
    const events = await this.eventsService.findEventsByUserEmail(userEmail);
    return response.status(HttpStatus.OK).json(events);
  }
}
