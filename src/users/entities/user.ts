import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { PersonalData } from './personal-data';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { validate } from '../../core/validation/validate';

export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

export interface UserConstructorParams {
  personalData: PersonalData;
}

@Exclude()
@Schema({ discriminatorKey: 'role' })
export class User {
  @Expose()
  @ValidateNested()
  @Type(() => PersonalData)
  @Prop({ required: true })
  personalData: PersonalData;

  @Expose()
  @IsEnum(Role)
  @IsOptional()
  @Prop({ enum: Role, index: true })
  role?: Role;

  constructor({ personalData }: UserConstructorParams) {
    this.personalData = personalData;

    validate(this);
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
