import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsLocale,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

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

  static fromPlain(plain: LoginDataConstructorParams) {
    return instantiateAndValidate(LoginData, plain);
  }
}
