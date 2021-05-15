import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { Role, User } from './user';
import { ValidateNested } from 'class-validator';
import { MasterData } from './master-data';
import { LoginData } from './login-data';

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

  constructor({ loginData, masterData }: MasterConstructorParams) {
    super({ loginData });
    this.role = Role.MASTER;

    this.masterData = masterData;
  }
}
