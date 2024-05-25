import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrgDocument = Org & Document;

@Schema()
export class Org {
    @Prop({ required: true })
    email: string;

    @Prop()
    address: string;

    @Prop()
    phoneNumber?: string;

    @Prop()
    website?: string;

    @Prop()
    facebook?: string;

    @Prop()
    twitter?: string;

    @Prop()
    instagram?: string;

    @Prop()
    linkedin?: string;

    @Prop()
    missionStatement?: string;

    @Prop()
    foundedDate?: Date;

    @Prop()
    numberOfVolunteers?: number;

    @Prop()
    eventsOrganized?: number;

    @Prop()
    logoUrl?: string;

    @Prop()
    operatingHours?: string;

    @Prop()
    servicesProvided?: string;

    @Prop()
    contactPerson?: string;
}

export const OrgSchema = SchemaFactory.createForClass(Org);
