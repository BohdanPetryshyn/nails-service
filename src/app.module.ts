import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UploadsModule } from './uploads/uploads.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [AuthModule, CoreModule, UploadsModule, AppointmentsModule, MessagesModule, NotificationsModule, PhotosModule],
})
export class AppModule {}
