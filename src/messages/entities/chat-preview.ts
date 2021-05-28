import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Message, MessageConstructorParams } from './message';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export interface ChatPreviewConstructorParams {
  toEmail: string;
  toFullName: string;
  toProfilePhoto: string;
  lastMessage: MessageConstructorParams;
}

@Exclude()
export class ChatPreview {
  @Expose()
  @IsEmail()
  toEmail: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  toFullName: string;

  @Expose()
  @IsUrl()
  toProfilePhoto: string;

  @Expose()
  @Type(() => Message)
  @ValidateNested()
  lastMessage: Message;

  static fromPlain(plain: ChatPreviewConstructorParams) {
    return instantiateAndValidate(ChatPreview, plain);
  }
}
