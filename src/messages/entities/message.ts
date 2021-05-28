import { classToPlain, Exclude, Expose, Type } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import {
  MessageSendRequest,
  MessageSendRequestConstructorParams,
} from './message-send-request';

export interface MessageConstructorParams
  extends MessageSendRequestConstructorParams {
  fromEmail: string;
  sentAt: Date;
}

@Exclude()
@Schema()
export class Message extends MessageSendRequest {
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

  static fromSendRequest(sendRequest: MessageSendRequest, fromEmail: string) {
    return this.fromPlain({
      ...sendRequest,
      fromEmail,
      sentAt: new Date(),
    });
  }

  toPlain() {
    return classToPlain(this);
  }
}
