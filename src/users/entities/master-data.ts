import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { UserData, UserDataConstructorParams } from './user-data';
import { Service } from './service';

export interface MasterDataConstructorParams extends UserDataConstructorParams {
  address: string;
  services: Service[];
}

@Exclude()
@Schema()
export class MasterData extends UserData {
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  @Prop()
  address?: string;

  @Expose()
  @Type(() => Service)
  @ValidateNested()
  @Prop({ required: true })
  services: Service[];

  constructor({
    address,
    services,
    city,
    bio,
    profilePhoto,
    firstName,
    lastName,
  }: MasterDataConstructorParams) {
    super({ city, bio, profilePhoto, firstName, lastName });
    this.address = address;
    this.services = services;
  }
}
