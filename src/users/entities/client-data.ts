import { Exclude } from 'class-transformer';
import { Schema } from '@nestjs/mongoose';
import { UserData, UserDataConstructorParams } from './user-data';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ClientDataConstructorParams extends UserDataConstructorParams {}

@Exclude()
@Schema()
export class ClientData extends UserData {
  static fromPlain(plain: ClientDataConstructorParams) {
    return instantiateAndValidate(ClientData, plain);
  }
}
