import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentEgg } from './entities/appointment';
import { Document, Model } from 'mongoose';

type AppointmentDocument = Appointment & Document;

export class AppointmentsDao {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(appointment: AppointmentEgg): Promise<Appointment> {
    const appointmentDocument = await this.appointmentModel.create(appointment);

    return Appointment.fromPlain(appointmentDocument);
  }

  async getByMasterEmail(masterEmail: string): Promise<Appointment[]> {
    const appointmentDocuments = await this.appointmentModel.find({
      masterEmail,
    });

    return appointmentDocuments.map(Appointment.fromPlain);
  }
}
