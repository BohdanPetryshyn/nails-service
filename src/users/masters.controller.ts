import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MastersService } from './masters.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { WorkingHours } from './entities/working-hours';
import { City } from './entities/city';
import { ServiceType } from './entities/service-type';
import { Master } from './entities/master';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(
    @Query('services') services: ServiceType[],
    @Query('city') city: City,
  ): Promise<Master[]> {
    return this.mastersService.search(services, city);
  }

  @UseGuards(JwtAuthGuard)
  @Put('working-hours')
  async addWorkingHours(
    @Req() request: AuthedRequest,
    @Body() workingHours: WorkingHours,
  ): Promise<void> {
    await this.mastersService.addWorkingHours(request.user.email, workingHours);
  }
}
