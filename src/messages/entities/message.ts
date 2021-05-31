import { classToPlain, Exclude, Expose, Type } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import {
  MessageSendRequest,
  MessageSendRequestConstructorParams,
} from './message-send-request';
import TransformDate from '../../core/validation/TransformDate';

export interface MessageConstructorParams
  extends MessageSendRequestConstructorParams {
  toEmail: string;
  fromEmail: string;
  sentAt: Date;
}

@Exclude()
@Schema()
export class Message extends MessageSendRequest {
  @Expose()
  @IsEmail()
  @Prop({ required: true })
  toEmail: string;

  @Expose()
  @IsEmail()
  @Prop({ required: true })
  fromEmail: string;

  @Expose()
  @Type(() => Date)
  @Prop({ required: true })
  sentAt: Date;

  static fromPlain(plain: MessageConstructorParams) {
    return instantiateAndValidate(Message, plain);
  }

  static fromSendRequest(
    sendRequest: MessageSendRequest,
    fromEmail: string,
    toEmail: string,
  ) {
    return this.fromPlain({
      ...sendRequest,
      fromEmail,
      toEmail,
      sentAt: new Date(),
    });
  }

  toPlain() {
    return classToPlain(this);
  }
}
