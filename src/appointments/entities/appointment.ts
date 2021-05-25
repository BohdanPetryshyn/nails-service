import { Exclude, Expose, Type } from 'class-transformer';
import { ArrayMinSize, IsMongoId, ValidateNested } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import { Service } from '../../users/entities/service';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

interface AppointmentCoreConstructorParams {
  masterEmail: string;
  clientEmail: string;
  from: Date;
}

interface AppointmentEggConstructorParams
  extends AppointmentCoreConstructorParams {
  services: Service[];
}

interface AppointmentConstructorParams extends AppointmentEggConstructorParams {
  id: string;
}

@Exclude()
@Schema()
export class AppointmentCore {
  @Expose()
  @Prop({ required: true })
  masterEmail: string;

  @Expose()
  @Prop({ required: true })
  clientEmail: string;

  @Expose()
  @Type(() => Date)
  @Prop({ required: true })
  from: Date;

  static fromPlain(plain: AppointmentCoreConstructorParams) {
    return instantiateAndValidate(AppointmentCore, plain);
  }
}

@Exclude()
@Schema()
export class AppointmentEgg extends AppointmentCore {
  @Expose()
  @Type(() => Service)
  @ValidateNested()
  @ArrayMinSize(1)
  @Prop({ required: true })
  services: Service[];

  static fromPlain(plain: AppointmentEggConstructorParams) {
    return instantiateAndValidate(AppointmentEgg, plain);
  }
}

@Exclude()
@Schema()
export class Appointment extends AppointmentEgg {
  @Expose()
  @IsMongoId()
  id: string;

  static fromPlain(plain: AppointmentConstructorParams) {
    return instantiateAndValidate(Appointment, plain);
  }
}
