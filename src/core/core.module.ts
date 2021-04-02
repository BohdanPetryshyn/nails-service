import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthcheck/healthcheck.controller';

@Module({
  controllers: [HealthCheckController],
})
export class CoreModule {}
