import { Exclude, Expose } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserData, UserDataConstructorParams } from './user-data';

export interface MasterDataConstructorParams extends UserDataConstructorParams {
  address: string;
}

@Exclude()
@Schema()
export class MasterData extends UserData {
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  @Prop()
  address?: string;

  constructor({ address, city, bio }: MasterDataConstructorParams) {
    super({ city, bio });
    this.address = address;
  }
}
