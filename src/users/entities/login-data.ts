import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsLocale,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { validate } from '../../core/validation/validate';

export interface LoginDataConstructorParams {
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  locale: string;
  pictureUrl: string;
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
  pictureUrl: string;

  constructor({
    email,
    firstName,
    lastName,
    gender,
    locale,
    pictureUrl,
  }: LoginDataConstructorParams) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.locale = locale;
    this.pictureUrl = pictureUrl;
  }
}
