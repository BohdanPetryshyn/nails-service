import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { ServiceType } from './service-type';
import { Prop, Schema } from '@nestjs/mongoose';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

interface ServiceConstructorParams {
  serviceType: ServiceType;
  price: number;
  duration: number;
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

  @Expose()
  @IsInt()
  @Prop({ required: true })
  duration: number;

  static fromPlain(plain: ServiceConstructorParams) {
    return instantiateAndValidate(Service, plain);
  }

  static totalPrice(services: Service[]): number {
    return services.reduce((price, service) => price + service.price, 0);
  }

  static totalDuration(services: Service[]): number {
    return services.reduce(
      (duration, service) => duration + service.duration,
      0,
    );
  }
}
