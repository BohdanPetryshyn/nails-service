import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { Role, User } from './user';
import { ValidateNested } from 'class-validator';
import { ClientData } from './client-data';
import { LoginData } from './login-data';

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

  constructor({ loginData, clientData }: ClientConstructorParams) {
    super({ loginData });
    this.role = Role.CLIENT;

    this.clientData = clientData;
  }
}
