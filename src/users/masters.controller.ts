import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { MastersService } from './masters.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { WorkingHours } from './entities/working-hours';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('working-hours')
  async addWorkingHours(
    @Req() request: AuthedRequest,
    @Body() workingHours: WorkingHours,
  ): Promise<void> {
    await this.mastersService.addWorkingHours(request.user.email, workingHours);
  }
}
