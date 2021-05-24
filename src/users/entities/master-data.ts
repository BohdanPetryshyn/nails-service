import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { UserData, UserDataConstructorParams } from './user-data';
import { Service } from './service';
import { WorkingHours } from './working-hours';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

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
  @Prop({ default: [] })
  workingHours: WorkingHours[];

  static fromPlain(plain: MasterDataConstructorParams) {
    return instantiateAndValidate(MasterData, plain);
  }
}
