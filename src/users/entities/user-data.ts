import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { City } from './city';

export interface UserDataConstructorParams {
  city: City;
  bio?: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
}

@Exclude()
@Schema()
export class UserData {
  @Expose()
  @IsEnum(City)
  @Prop({ required: true })
  city: City;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop()
  bio?: string;

  @Expose()
  @IsUrl()
  @Prop()
  profilePhoto: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  lastName: string;

  constructor({
    city,
    bio,
    profilePhoto,
    firstName,
    lastName,
  }: UserDataConstructorParams) {
    this.city = city;
    this.bio = bio;
    this.profilePhoto = profilePhoto;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
