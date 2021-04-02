import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { PersonalData } from './personal-data';
import { IsEnum, ValidateNested } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';

export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

@Exclude()
@Schema()
export class User {
  @Expose()
  @ValidateNested()
  @Type(() => PersonalData)
  @Prop({ required: true })
  personalData: PersonalData;

  @Expose()
  @IsEnum(Role)
  @Prop({ required: true })
  role: Role;

  static fromPlain(plain: User) {
    return instantiateAndValidate(User, plain);
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
