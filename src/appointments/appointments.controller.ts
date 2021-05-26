import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AppointmentCreateRequest } from './entities/appointment-create-request';
import { Appointment } from './entities/appointment';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { AppointmentView } from './entities/appointment-view';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() request: AuthedRequest,
    @Body() createRequest: AppointmentCreateRequest,
  ): Promise<AppointmentView> {
    const userEmail = request.user.email;
    const masterEmail = createRequest.masterEmail;
    if (masterEmail != userEmail) {
      throw new UnauthorizedException(
        `User ${userEmail} can't create appointments for master ${masterEmail}`,
      );
    }
    return this.appointmentsService.create(createRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get('master')
  async getAllMasterAppointments(
    @Req() request: AuthedRequest,
  ): Promise<AppointmentView[]> {
    return this.appointmentsService.getByMasterEmail(request.user.email);
  }
}
