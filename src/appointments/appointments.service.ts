import { Injectable } from '@nestjs/common';
import { AppointmentsDao } from './appointments.dao';
import { Appointment, AppointmentEgg } from './entities/appointment';

@Injectable()
export class AppointmentsService {
  constructor(private readonly appointmentsDao: AppointmentsDao) {}

  async create(appointment: AppointmentEgg): Promise<Appointment> {
    return this.appointmentsDao.create(appointment);
  }

  async getByMasterEmail(masterEmail: string): Promise<Appointment[]> {
    return this.appointmentsDao.getByMasterEmail(masterEmail);
  }
}
