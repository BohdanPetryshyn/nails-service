import { Exclude, Expose } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export interface PushTokenAssociationConstructorParams {
  email: string;
  token: string;
}

@Exclude()
@Schema()
export class PushTokenAssociation {
  @Expose()
  @IsEmail()
  @Prop({ required: true, index: true })
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  token: string;

  static fromPlain(plain: PushTokenAssociationConstructorParams) {
    return instantiateAndValidate(PushTokenAssociation, plain);
  }
}
