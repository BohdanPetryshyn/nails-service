import { Injectable } from '@nestjs/common';
import { AppointmentsDao } from './appointments.dao';
import { Appointment, AppointmentEgg } from './entities/appointment';
import { AppointmentCreateRequest } from './entities/appointment-create-request';
import { MastersService } from '../users/masters.service';
import { UsersService } from '../users/users.service';
import { AppointmentView } from './entities/appointment-view';
import { UserData } from '../users/entities/user-data';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsDao: AppointmentsDao,
    private readonly mastersService: MastersService,
    private readonly usersService: UsersService,
  ) {}

  async getByMasterEmail(
    masterEmail: string,
    from?: Date,
    to?: Date,
  ): Promise<AppointmentView[]> {
    const appointments = await this.appointmentsDao.getByMasterEmail(
      masterEmail,
      from,
      to,
    );
    return this.toAppointmentViews(appointments);
  }

  async getByClientEmail(
    clientEmail: string,
    from?: Date,
    to?: Date,
  ): Promise<AppointmentView[]> {
    const appointments = await this.appointmentsDao.getByClientEmail(
      clientEmail,
      from,
      to,
    );
    return this.toAppointmentViews(appointments);
  }

  async create(
    createRequest: AppointmentCreateRequest,
  ): Promise<AppointmentView> {
    const appointment = await this.toAppointmentEgg(createRequest);

    const createdAppointment = await this.createInternal(appointment);

    return this.toAppointmentView(createdAppointment);
  }

  async deleteById(id: string): Promise<void> {
    await this.appointmentsDao.deleteById(id);
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

  private async toAppointmentViews(
    appointments: Appointment[],
  ): Promise<AppointmentView[]> {
    const usersData = await this.getUsersData(appointments);

    return appointments.map((appointment) =>
      AppointmentView.fromAppointment(
        appointment,
        usersData.get(appointment.clientEmail).fullName,
        usersData.get(appointment.clientEmail).profilePhoto,
        usersData.get(appointment.masterEmail).fullName,
      ),
    );
  }

  private async toAppointmentView(
    appointment: Appointment,
  ): Promise<AppointmentView> {
    const clientData = await this.usersService.getUserDataByEmail(
      appointment.clientEmail,
    );
    const masterData = await this.usersService.getUserDataByEmail(
      appointment.masterEmail,
    );

    return AppointmentView.fromAppointment(
      appointment,
      clientData.fullName,
      clientData.profilePhoto,
      masterData.fullName,
    );
  }

  private async getUsersData(
    appointments: Appointment[],
  ): Promise<Map<string, UserData>> {
    const userEmails = appointments.flatMap((appointment) => [
      appointment.masterEmail,
      appointment.clientEmail,
    ]);
    return this.usersService.getUserDataByEmails(userEmails);
  }

  private async createInternal(
    appointment: AppointmentEgg,
  ): Promise<Appointment> {
    return this.appointmentsDao.create(appointment);
  }
}
