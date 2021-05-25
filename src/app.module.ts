import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UploadsModule } from './uploads/uploads.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [AuthModule, CoreModule, UploadsModule, AppointmentsModule],
})
export class AppModule {}
