import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongoModule } from '../mongo/mongo.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Appointment } from './entities/appointment';
import { AppointmentsDao } from './appointments.dao';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: Appointment.name,
        schema: SchemaFactory.createForClass(Appointment),
      },
    ]),
    UsersModule,
  ],
  providers: [AppointmentsService, AppointmentsDao],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
