import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AppointmentCreateRequest } from './entities/appointment-create-request';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { AppointmentView } from './entities/appointment-view';
import { ParseDatePipe } from '../core/validation/pipes/parse-date.pipe';

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
    const { clientEmail, masterEmail } = createRequest;
    if (![clientEmail, masterEmail].includes(userEmail)) {
      throw new UnauthorizedException(
        `User ${userEmail} can't create appointments for master ${masterEmail} and client ${clientEmail}`,
      );
    }
    return this.appointmentsService.create(createRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get('master')
  async getAllMasterAppointments(
    @Req() request: AuthedRequest,
    @Query('from', new ParseDatePipe({ isOptional: true })) from?: Date,
    @Query('to', new ParseDatePipe({ isOptional: true })) to?: Date,
  ): Promise<AppointmentView[]> {
    return this.appointmentsService.getByMasterEmail(
      request.user.email,
      from,
      to,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('client')
  async getAllClientAppointments(
    @Req() request: AuthedRequest,
    @Query('from', new ParseDatePipe({ isOptional: true })) from?: Date,
    @Query('to', new ParseDatePipe({ isOptional: true })) to?: Date,
  ): Promise<AppointmentView[]> {
    return this.appointmentsService.getByClientEmail(
      request.user.email,
      from,
      to,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.appointmentsService.deleteById(id);
  }
}
