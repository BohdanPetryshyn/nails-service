import { Exclude, Expose, Type } from 'class-transformer';
import { Appointment, AppointmentConstructorParams } from './appointment';
import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import { Service } from '../../users/entities/service';
import { DateUtils } from '../../core/utils/date.utils';

export interface AppointmentViewConstructorParams
  extends AppointmentConstructorParams {
  clientFullName: string;
  clientProfilePhoto: string;
  masterFullName: string;
  to: Date;
  price: number;
}

@Exclude()
export class AppointmentView extends Appointment {
  @Expose()
  @IsString()
  @IsNotEmpty()
  clientFullName: string;

  @Expose()
  @IsUrl()
  clientProfilePhoto: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  masterFullName: string;

  @Expose()
  @Type(() => Date)
  to: Date;

  @Expose()
  @IsInt()
  price: number;

  static fromPlain(plain: AppointmentViewConstructorParams) {
    return instantiateAndValidate(AppointmentView, plain);
  }

  static fromAppointment(
    appointment: Appointment,
    clientFullName: string,
    clientProfilePhoto: string,
    masterFullName: string,
  ): AppointmentView {
    const totalDurationMinutes = Service.totalDuration(appointment.services);
    const to = DateUtils.addMinutes(appointment.from, totalDurationMinutes);

    const price = Service.totalPrice(appointment.services);

    return this.fromPlain({
      ...appointment,
      clientFullName,
      clientProfilePhoto,
      masterFullName,
      to,
      price,
    });
  }
}
