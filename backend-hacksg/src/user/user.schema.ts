import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
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
    @Prop({ type: Types.ObjectId, ref: 'Org' })
    orginfo: Types.ObjectId;
    @Prop({default: 0})
    exp: number;
    @Prop()
    achievements: Array<string>;
}
export const UserSchema = SchemaFactory.createForClass(User);