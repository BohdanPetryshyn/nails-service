import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { City } from './city';

export interface UserDataConstructorParams {
  city: City;
  bio?: string;
  profilePhoto?: string;
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
  profilePhoto?: string;

  constructor({ city, bio, profilePhoto }: UserDataConstructorParams) {
    this.city = city;
    this.bio = bio;
    this.profilePhoto = profilePhoto;
  }
}
