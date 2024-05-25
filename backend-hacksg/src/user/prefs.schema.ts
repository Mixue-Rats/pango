import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PrefsDocument = Prefs & Document;

@Schema()
export class Prefs {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true, enum: ['Environmental', 'Animal', 'Social', 'Healthcare'] })
    preferredVolunteerType: string;

    @Prop({ type: [String], enum: ['Leadership', 'Communication', 'Technical', 'Organizational', 'Creativity', 'Problem Solving', 'Teamwork'] })
    skills: string[];

    @Prop({ type: [String], enum: ['Introverted', 'Extroverted', 'Ambivert', 'Analytical', 'Creative', 'Practical'] })
    personalityTraits: string[];

    @Prop()
    availableDays: string[];

    @Prop()
    preferredLocation: string;

    @Prop()
    additionalPreferences: string;
}

export const PrefsSchema = SchemaFactory.createForClass(Prefs);
