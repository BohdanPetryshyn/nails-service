import { Exclude, Expose } from 'class-transformer';
import {
  AppointmentCore,
  AppointmentCoreConstructorParams,
} from './appointment';
import { IsEnum } from 'class-validator';
import { ServiceType } from '../../users/entities/service-type';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export interface AppointmentCreateRequestConstructorParams
  extends AppointmentCoreConstructorParams {
  services: ServiceType[];
}

@Exclude()
export class AppointmentCreateRequest extends AppointmentCore {
  @Expose()
  @IsEnum(ServiceType, { each: true })
  services: ServiceType[];

  static fromPlain(plain: AppointmentCreateRequestConstructorParams) {
    return instantiateAndValidate(AppointmentCreateRequest, plain);
  }
}
