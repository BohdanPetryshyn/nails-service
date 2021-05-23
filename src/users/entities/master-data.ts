import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { UserData, UserDataConstructorParams } from './user-data';
import { Service } from './service';
import { WorkingHours } from './working-hours';

export interface MasterDataConstructorParams extends UserDataConstructorParams {
  address: string;
  services: Service[];
  workingHours: WorkingHours[];
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

  @Expose()
  @Type(() => WorkingHours)
  @ValidateNested()
  @Prop({ required: true })
  workingHours: WorkingHours[];

  constructor({
    address,
    services,
    city,
    bio,
    profilePhoto,
    firstName,
    lastName,
    workingHours,
  }: MasterDataConstructorParams) {
    super({ city, bio, profilePhoto, firstName, lastName });
    this.address = address;
    this.services = services;
    this.workingHours = workingHours;
  }
}
