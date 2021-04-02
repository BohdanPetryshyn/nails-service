import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  healthCheck(): string {
    return 'So far so good.';
  }
}
