import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsLocale,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export interface LoginDataConstructorParams {
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  locale: string;
  profilePhoto: string;
}

@Exclude()
@Schema()
export class LoginData {
  @Expose()
  @IsEmail()
  @Prop({ required: true })
  email: string;

  @Expose()
  @IsNotEmpty()
  @Prop({ required: true })
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @Prop({ required: true })
  lastName: string;

  @Expose()
  @IsOptional()
  @Prop()
  gender?: string;

  @Expose()
  @IsLocale()
  @Prop({ required: true })
  locale: string;

  @Expose()
  @IsUrl()
  @Prop({ required: true })
  profilePhoto: string;

  constructor({
    email,
    firstName,
    lastName,
    gender,
    locale,
    profilePhoto,
  }: LoginDataConstructorParams) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.locale = locale;
    this.profilePhoto = profilePhoto;
  }
}
