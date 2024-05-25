import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop({ unique: true })
    id: number;
    @Prop({required:true})
    fullname: string;
    @Prop({required:true, unique:true, lowercase:true})
    email: string;
    @Prop({required:true})
    password: string
    @Prop({default: "volunteer" })
    role: string;
    @Prop({default: Date.now() })
    createdDate: Date
    @Prop({default: false})
    verified: Boolean
    @Prop({ type: Types.ObjectId, ref: 'Prefs' })
    prefs: Types.ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(User);