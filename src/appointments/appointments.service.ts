import { Injectable } from '@nestjs/common';
import { AppointmentsDao } from './appointments.dao';
import { Appointment, AppointmentEgg } from './entities/appointment';
import { AppointmentCreateRequest } from './entities/appointment-create-request';
import { MastersService } from '../users/masters.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsDao: AppointmentsDao,
    private readonly mastersService: MastersService,
  ) {}

  async getByMasterEmail(masterEmail: string): Promise<Appointment[]> {
    return this.appointmentsDao.getByMasterEmail(masterEmail);
  }

  async create(createRequest: AppointmentCreateRequest): Promise<Appointment> {
    const master = await this.mastersService.getByEmail(
      createRequest.masterEmail,
    );

    const serviceTypes = createRequest.services;
    const services = master.masterData.services.filter((service) =>
      serviceTypes.includes(service.serviceType),
    );

    const appointment = AppointmentEgg.fromPlain({
      ...createRequest,
      services,
    });

    return this.createInternal(appointment);
  }

  private async createInternal(
    appointment: AppointmentEgg,
  ): Promise<Appointment> {
    return this.appointmentsDao.create(appointment);
  }
}
