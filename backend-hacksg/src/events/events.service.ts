import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto } from './events.createeventdto';
import { Model } from 'mongoose';
import { Event, EventDocument } from './events.schema';  // Import your Event schema
import { User, UserDocument } from '../user/user.schema';  // If you need to handle users
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async joinEvent(joinEventDto: any): Promise<any> {
    const { userEmail, eventId } = joinEventDto;
    // Logic to add user to event
    const foundEvent = await this.eventModel.findById(eventId).exec();
    // Only volunteers can join events
    const foundUser = await this.userModel.findOne({ email: userEmail, role: 'volunteer'  });

    if (foundEvent && foundUser) {
      // Push email to participants array
      foundEvent.participants.push(userEmail);
      await foundEvent.save();
      return { message: 'Joined event successfully' };
    } else {
      throw new Error('Event or User not found');
    }
  }

  async findUsersByEvent(eventId: string): Promise<User[]> {
    const event = await this.eventModel.findById(eventId).populate('participants').exec();
    return event ? event.participants : [];
  }

  async findEventsByUserEmail(userEmail: string): Promise<Event[]> {
    return this.eventModel.find({ participants: userEmail }).exec();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<any> {
    const { organiser_email } = createEventDto;
    const organiser = await this.userModel.findOne({ email: organiser_email, role: 'organisation' }).exec();

    if (!organiser) {
        return { message: 'Organisation does not exist' };
    }

    const newEvent = new this.eventModel(createEventDto);
    const payload = {
      "desc": newEvent.desc,
      "id": newEvent._id
    }
    const result = await this.httpService.post(process.env.IP + "8000/addevent", payload);
    console.log(result);
    return newEvent.save();
  }
}
