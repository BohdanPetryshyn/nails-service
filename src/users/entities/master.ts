import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user';
import { IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';

export interface MasterInfoConstructorParams {
  address: string;
}

export interface MasterCoreConstructorParams
  extends MasterInfoConstructorParams {
  user: string;
}

interface MasterConstructorParams {
  user: string;
  address: string;
  id: string;
}

interface MasterPopulatedConstructorParams {
  address: string;
  id: string;
  user: User;
}

@Exclude()
@Schema()
export class MasterInfo {
  @Expose()
  @IsNotEmpty()
  @Prop({ required: true })
  address: string;

  constructor({ address }: MasterInfoConstructorParams) {
    this.address = address;
  }
}

@Exclude()
@Schema()
export class MasterCore extends MasterInfo {
  @Expose()
  @IsMongoId()
  @Prop({
    type: String,
    ref: User.name,
    required: true,
  })
  user: string;

  constructor({ user, address }: MasterCoreConstructorParams) {
    super({ address });
    this.user = user;
  }
}

@Exclude()
@Schema()
export class Master extends MasterCore {
  @Expose()
  @IsMongoId()
  id: string;

  constructor({ user, address, id }: MasterConstructorParams) {
    super({ user, address });
    this.id = id;
  }
}

@Expose()
export class MasterPopulated extends MasterInfo {
  @Expose()
  @IsMongoId()
  id: string;

  @Expose()
  @Type(() => User)
  @ValidateNested()
  user: User;

  constructor({ address, id, user }: MasterPopulatedConstructorParams) {
    super({ address });
    this.id = id;
    this.user = user;
  }
}
