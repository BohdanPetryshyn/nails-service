import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';
import { ServiceType } from '../entities/service-type';
import { City } from '../entities/city';

@Exclude()
export class MasterSearchRequest {
  @Expose()
  @Type(() => Date)
  from: Date;

  @Expose()
  @IsEnum(ServiceType, { each: true })
  services: ServiceType[];

  @Expose()
  @IsEnum(City)
  city: City;
}
