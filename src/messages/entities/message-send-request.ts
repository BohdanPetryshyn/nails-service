import { classToPlain, Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export interface MessageSendRequestConstructorParams {
  toEmail: string;
  text: string;
}

@Exclude()
@Schema()
export class MessageSendRequest {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  text: string;

  static fromPlain(plain: MessageSendRequestConstructorParams) {
    return instantiateAndValidate(MessageSendRequest, plain);
  }
}
