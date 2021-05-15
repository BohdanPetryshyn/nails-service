import { Exclude } from 'class-transformer';
import { Schema } from '@nestjs/mongoose';
import { PersonalData, PersonalDataConstructorParams } from './personal-data';
import { validate } from '../../core/validation/validate';

@Exclude()
@Schema()
export class ClientPersonalData extends PersonalData {
  constructor({
    email,
    firstName,
    lastName,
    gender,
    locale,
    pictureUrl,
  }: PersonalDataConstructorParams) {
    super({ email, firstName, lastName, gender, locale, pictureUrl });

    validate(this);
  }
}
