import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export interface MessageConstructorParams {
  fromEmail: string;
  toEmail: string;
  text: string;
  sentAt: Date;
}

@Exclude()
@Schema()
export class Message {
  @Expose()
  @IsEmail()
  @Prop({ required: true })
  fromEmail: string;

  @Expose()
  @IsEmail()
  @Prop({ required: true })
  toEmail: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  text: string;

  @Expose()
  @Type(() => Date)
  @Prop({ required: true })
  sentAt: Date;

  static fromPlain(plain: MessageConstructorParams) {
    return instantiateAndValidate(Message, plain);
  }
}
