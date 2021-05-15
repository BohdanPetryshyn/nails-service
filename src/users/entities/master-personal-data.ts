import { PersonalData, PersonalDataConstructorParams } from './personal-data';
import { Exclude, Expose } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { validate } from '../../core/validation/validate';

interface MasterPersonalDataConstructorParams
  extends PersonalDataConstructorParams {
  address?: string;
  bio?: string;
}

@Exclude()
@Schema()
export class MasterPersonalData extends PersonalData {
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  @Prop()
  address?: string;

  @Expose()
  @IsNotEmpty()
  @IsOptional()
  @Prop()
  bio?: string;

  constructor({
    email,
    firstName,
    lastName,
    gender,
    locale,
    pictureUrl,
    address,
    bio,
  }: MasterPersonalDataConstructorParams) {
    super({ email, firstName, lastName, gender, locale, pictureUrl });
    this.address = address;
    this.bio = bio;

    validate(this);
  }
}
