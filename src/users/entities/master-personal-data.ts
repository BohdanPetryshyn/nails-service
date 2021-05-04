import { PersonalData } from './personal-data';
import { Exclude, Expose } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';

@Exclude()
@Schema()
export class MasterPersonalData extends PersonalData {
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  @Prop()
  address?: string;

  @Expose()
  @IsNotEmpty()
  @IsOptional()
  @Prop()
  bio?: string;

  static fromPlain(plain: MasterPersonalData) {
    return instantiateAndValidate(MasterPersonalData, plain);
  }
}
