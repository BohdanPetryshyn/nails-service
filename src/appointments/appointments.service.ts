import { Injectable } from '@nestjs/common';
import { AppointmentsDao } from './appointments.dao';
import { Appointment, AppointmentEgg } from './entities/appointment';
import { AppointmentCreateRequest } from './entities/appointment-create-request';
import { MastersService } from '../users/masters.service';
import { UsersService } from '../users/users.service';
import { AppointmentView } from './entities/appointment-view';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsDao: AppointmentsDao,
    private readonly mastersService: MastersService,
    private readonly usersService: UsersService,
  ) {}

  async getByMasterEmail(masterEmail: string): Promise<AppointmentView[]> {
    const appointments = await this.appointmentsDao.getByMasterEmail(
      masterEmail,
    );
    const clientFullNames = await this.getClientFullNames(appointments);

    return appointments.map((appointment) =>
      AppointmentView.fromAppointment(
        appointment,
        clientFullNames.get(appointment.clientEmail),
      ),
    );
  }

  async create(
    createRequest: AppointmentCreateRequest,
  ): Promise<AppointmentView> {
    const appointment = await this.toAppointmentEgg(createRequest);

    const createdAppointment = await this.createInternal(appointment);

    return this.toAppointmentView(createdAppointment);
  }

  private async toAppointmentEgg(
    createRequest: AppointmentCreateRequest,
  ): Promise<AppointmentEgg> {
    const master = await this.mastersService.getByEmail(
      createRequest.masterEmail,
    );

    const serviceTypes = createRequest.services;
    const services = master.masterData.services.filter((service) =>
      serviceTypes.includes(service.serviceType),
    );

    return AppointmentEgg.fromPlain({
      ...createRequest,
      services,
    });
  }

  private async toAppointmentView(
    appointment: Appointment,
  ): Promise<AppointmentView> {
    const clientFullName = await this.getClientFullName(
      appointment.clientEmail,
    );

    return AppointmentView.fromAppointment(appointment, clientFullName);
  }

  private async getClientFullNames(
    appointments: Appointment[],
  ): Promise<Map<string, string>> {
    const clientEmails = appointments.map(
      (appointment) => appointment.clientEmail,
    );
    return this.usersService.getFullNameByEmails(clientEmails);
  }

  private async getClientFullName(clientEmail: string): Promise<string> {
    const clientFullNames = await this.usersService.getFullNameByEmails([
      clientEmail,
    ]);
    return clientFullNames.get(clientEmail);
  }

  private async createInternal(
    appointment: AppointmentEgg,
  ): Promise<Appointment> {
    return this.appointmentsDao.create(appointment);
  }
}
