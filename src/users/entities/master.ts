import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { Role, User } from './user';
import { ValidateNested } from 'class-validator';
import { MasterData } from './master-data';
import { LoginData } from './login-data';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

interface MasterConstructorParams {
  loginData: LoginData;
  masterData: MasterData;
}

@Exclude()
@Schema()
export class Master extends User {
  @Expose()
  @ValidateNested()
  @Type(() => MasterData)
  @Prop({ required: true })
  masterData: MasterData;

  static fromPlain(plain: MasterConstructorParams) {
    return instantiateAndValidate(Master, plain);
  }
}
