import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user';
import { ValidateNested } from 'class-validator';
import * as mongoose from 'mongoose';

export interface ClientConstructorParams {
  user: User;
}

@Exclude()
@Schema()
export class Client {
  @Expose()
  @Type(() => User)
  @ValidateNested()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  constructor({ user }: ClientConstructorParams) {
    this.user = user;
  }
}
