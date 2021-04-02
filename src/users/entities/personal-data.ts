import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsLocale, IsNotEmpty, IsUrl } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';

@Exclude()
@Schema()
export class PersonalData {
  @Expose()
  @IsEmail()
  @Prop({ required: true })
  email: string;

  @Expose()
  @IsNotEmpty()
  @Prop({ required: true })
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @Prop({ required: true })
  lastName: string;

  @Expose()
  @Prop({ required: true })
  gender: string;

  @Expose()
  @IsLocale()
  @Prop({ required: true })
  locale: string;

  @Expose()
  @IsUrl()
  @Prop({ required: true })
  pictureUrl: string;

  static fromPlain(checkRequest: PersonalData) {
    return instantiateAndValidate(PersonalData, checkRequest);
  }
}
