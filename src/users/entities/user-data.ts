import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { City } from './city';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import { LoginData } from './login-data';

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
  @IsOptional()
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

  static fromPlain(plain: UserDataConstructorParams) {
    return instantiateAndValidate(UserData, plain);
  }

  get fullName() {
    return UserData.getFullName(this);
  }

  static getFullName(userData: { firstName: string; lastName: string }) {
    return `${userData.firstName} ${userData.lastName}`;
  }
}
