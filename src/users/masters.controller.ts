import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MastersService } from './masters.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { WorkingHours } from './entities/working-hours';
import { MasterSearchResult } from './entities/master-search-result';
import { MasterSearchRequest } from './dto/master-search-request';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('search')
  async search(
    @Body() searchRequest: MasterSearchRequest,
  ): Promise<MasterSearchResult[]> {
    return this.mastersService.search(
      searchRequest.from,
      searchRequest.services,
      searchRequest.city,
    );
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
