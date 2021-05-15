import { Exclude } from 'class-transformer';
import { Schema } from '@nestjs/mongoose';
import { UserData, UserDataConstructorParams } from './user-data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ClientDataConstructorParams extends UserDataConstructorParams {}

@Exclude()
@Schema()
export class ClientData extends UserData {
  constructor({}: ClientDataConstructorParams) {
    super({});
  }
}
