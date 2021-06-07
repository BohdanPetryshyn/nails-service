import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ClientsService } from './clients.service';
import { Client } from './entities/client';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Client[]> {
    return this.clientsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query('query') query: string): Promise<Client[]> {
    return this.clientsService.search(query);
  }
}
