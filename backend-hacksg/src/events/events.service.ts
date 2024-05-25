import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto } from './events.createeventdto';
import { Model } from 'mongoose';
import { Event, EventDocument } from './events.schema';  // Import your Event schema
import { User, UserDocument } from '../user/user.schema';  // If you need to handle users
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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
      "event_id": newEvent._id
    }
    try {
      const result = await firstValueFrom(this.httpService.post(`http://localhost:8000/addevent`, payload));
      console.log('Status:', result.status);
      console.log('Headers:', result.headers);
      console.log('Data:', result.data);
    } catch (error) {
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        throw error;
    }
    return newEvent.save();
  }

  async click(clickDto: any) {
    const { userId, eventId } = clickDto;
    const event = await this.eventModel.findById(eventId).exec();
    if (event) {
        if (event.clicks.has(userId)) {
            // Increment the click count for the existing userId
            event.clicks.set(userId, event.clicks.get(userId) + 1);
        } else {
            // Initialize the click count for the new userId
            event.clicks.set(userId, 1);
        }
        // Save the updated event document
        await event.save();
        return event;
    } else {
        throw new Error('Event not found');
    }
  }

  async recommend(userId: string) {
    const events = await this.eventModel.find().exec();
    const clickCounts = {};

    events.forEach(event => {
      console.log(event._id)
      console.log(event.clicks.has(userId))
      if (event.clicks.has(userId)) {
        clickCounts[event._id.toString()] = event.clicks.get(userId);
      }
    });

    console.log(clickCounts);

    // Post the clickCounts dictionary to the recommendation service
    const url = 'http://localhost:8000/recommend';
    const response = await firstValueFrom(this.httpService.post(url, clickCounts));

    return response.data;
  }
}


