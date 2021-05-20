import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { ServiceType } from './service-type';
import { Prop, Schema } from '@nestjs/mongoose';

interface ServiceConstructorParams {
  serviceType: ServiceType;
  price: number;
}

@Exclude()
@Schema()
export class Service {
  @Expose()
  @IsEnum(ServiceType)
  @Prop({ required: true })
  serviceType: ServiceType;

  @Expose()
  @IsInt()
  @Prop({ required: true })
  price: number;

  constructor({ serviceType, price }: ServiceConstructorParams) {
    this.serviceType = serviceType;
    this.price = price;
  }
}
