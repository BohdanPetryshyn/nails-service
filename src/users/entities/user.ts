import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsLocale,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

export interface UserCoreConstructorParams {
  role?: Role;
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  gender?: string;
  pictureUrl: string;
}

export interface UserConstructorParams extends UserCoreConstructorParams {
  id: string;
}

@Exclude()
@Schema()
export class UserCore {
  @Expose()
  @IsEnum(Role)
  @IsOptional()
  @Prop()
  role?: Role;

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
  @IsLocale()
  @IsOptional()
  @Prop()
  locale: string;

  @Expose()
  @IsOptional()
  @Prop()
  gender?: string;

  @Expose()
  @IsUrl()
  @Prop({ required: true })
  pictureUrl: string;

  constructor({
    role,
    email,
    firstName,
    lastName,
    locale,
    gender,
    pictureUrl,
  }: UserCoreConstructorParams) {
    this.role = role;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.locale = locale;
    this.gender = gender;
    this.pictureUrl = pictureUrl;
  }
}

@Exclude()
@Schema()
export class User extends UserCore {
  @Expose()
  @IsMongoId()
  id: string;

  constructor({
    firstName,
    lastName,
    gender,
    pictureUrl,
    role,
    email,
    locale,
    id,
  }: UserConstructorParams) {
    super({
      role,
      email,
      firstName,
      lastName,
      locale,
      gender,
      pictureUrl,
    });
    this.id = id;
  }
}
