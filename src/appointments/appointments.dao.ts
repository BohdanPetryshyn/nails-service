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

  async getByMasterEmail(
    masterEmail: string,
    from?: Date,
    to?: Date,
  ): Promise<Appointment[]> {
    const query = {
      masterEmail,
    };
    if (from || to) {
      query['from'] = AppointmentsDao.getDateRangeQuery(from, to);
    }

    const appointmentDocuments = await this.appointmentModel.find(query);

    return appointmentDocuments.map(Appointment.fromPlain);
  }

  async getByClientEmail(
    clientEmail: string,
    from?: Date,
    to?: Date,
  ): Promise<Appointment[]> {
    const query = {
      clientEmail,
    };
    if (from || to) {
      query['from'] = AppointmentsDao.getDateRangeQuery(from, to);
    }

    const appointmentDocuments = await this.appointmentModel.find(query);

    return appointmentDocuments.map(Appointment.fromPlain);
  }

  private static getDateRangeQuery(from: Date, to: Date) {
    const query = {};

    if (from) {
      query['$gte'] = from;
    }

    if (to) {
      query['$lte'] = to;
    }

    return query;
  }
}
