import { Exclude, Expose } from 'class-transformer';
import {
  ArrayMinSize,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ServiceType } from './service-type';
import { AppointmentConstructorParams } from '../../appointments/entities/appointment';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export interface MasterSearchResultConstructorParams {
  masterEmail: string;

  fullName: string;

  address: string;

  availableServices: ServiceType[];

  price: number;

  duration: number;
}

@Exclude()
export class MasterSearchResult {
  @Expose()
  @IsEmail()
  masterEmail: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Expose()
  @IsEnum(ServiceType, { each: true })
  @ArrayMinSize(1)
  availableServices: ServiceType[];

  @Expose()
  @IsInt()
  price: number;

  @Expose()
  @IsInt()
  duration: number;

  static fromPlain(plain: MasterSearchResultConstructorParams) {
    return instantiateAndValidate(MasterSearchResult, plain);
  }
}
