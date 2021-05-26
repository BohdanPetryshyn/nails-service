import { Exclude, Expose, Type } from 'class-transformer';
import { Appointment, AppointmentConstructorParams } from './appointment';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import { ClientData } from '../../users/entities/client-data';
import { Service } from '../../users/entities/service';

export interface AppointmentViewConstructorParams
  extends AppointmentConstructorParams {
  clientFullName: string;
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
  ): AppointmentView {
    const totalDurationMinutes = Service.totalDuration(appointment.services);
    const to = this.addMinutes(appointment.from, totalDurationMinutes);

    const price = Service.totalPrice(appointment.services);

    return this.fromPlain({
      ...appointment,
      clientFullName,
      to,
      price,
    });
  }

  static addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60_000);
  }
}
