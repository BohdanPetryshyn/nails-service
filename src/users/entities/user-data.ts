import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { City } from './city';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserDataConstructorParams {
  city: City;
  bio?: string;
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor({ city, bio }: UserDataConstructorParams) {
    this.city = city;
    this.bio = bio;
  }
}
