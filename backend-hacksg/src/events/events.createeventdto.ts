import { IsEmail, IsNotEmpty, IsString, IsOptional, IsArray, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEmail()
  organiser_email: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  participants?: string[];

  @IsDate()
  startDateTime: Date;

  @IsDate()
  endDateTime: Date;

}
