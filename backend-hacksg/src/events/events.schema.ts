import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema'; 

export type EventDocument = Event & Document;
@Schema()
export class Event {
    @Prop({required:true})
    title: string;
    @Prop({required:true})
    organiser_email: string
    @Prop()
    desc: string;
    @Prop()
    location: string;
    @Prop({default: Date.now() })
    createdDate: Date
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    participants: User[];
    @Prop()
    startDateTime: Date
    @Prop()
    endDateTime: Date
    @Prop({ type: Map, of: Number, default: {} })
    clicks: Map<string, number>;
}
export const EventSchema = SchemaFactory.createForClass(Event);
