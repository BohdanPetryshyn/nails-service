import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user';
import { ValidateNested } from 'class-validator';
import { ClientData } from './client-data';
import { LoginData } from './login-data';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

interface ClientConstructorParams {
  loginData: LoginData;
  clientData: ClientData;
}

@Exclude()
@Schema()
export class Client extends User {
  @Expose()
  @ValidateNested()
  @Type(() => ClientData)
  @Prop({ required: true })
  clientData: ClientData;

  static fromPlain(plain: ClientConstructorParams) {
    return instantiateAndValidate(Client, plain);
  }
}
