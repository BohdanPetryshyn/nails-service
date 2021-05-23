import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { LoginData } from './login-data';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

export interface UserConstructorParams {
  loginData: LoginData;
}

@Exclude()
@Schema({ discriminatorKey: 'role' })
export class User {
  @Expose()
  @ValidateNested()
  @Type(() => LoginData)
  @Prop({ required: true })
  loginData: LoginData;

  @Expose()
  @IsEnum(Role)
  @IsOptional()
  @Prop({ enum: Role, index: true })
  role?: Role;

  static fromPlain(plain: UserConstructorParams) {
    return instantiateAndValidate(User, plain);
  }
}
