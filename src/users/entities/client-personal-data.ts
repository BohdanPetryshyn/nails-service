import { Exclude } from 'class-transformer';
import { Schema } from '@nestjs/mongoose';
import { PersonalData } from './personal-data';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';

@Exclude()
@Schema()
export class ClientPersonalData extends PersonalData {
  static fromPlain(plain: ClientPersonalData) {
    return instantiateAndValidate(ClientPersonalData, plain);
  }
}
