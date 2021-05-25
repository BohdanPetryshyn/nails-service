import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppointmentsService } from './appointments/appointments.service';
import { AppointmentEgg } from './appointments/entities/appointment';
import { ServiceType } from './users/entities/service-type';
import { Service } from './users/entities/service';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);

  const service = context.get(AppointmentsService);

  const createdAppointment = await service.create(
    AppointmentEgg.fromPlain({
      masterEmail: 'b.y.petryshyn@gmail.com',
      clientEmail: 'opetric@gmail.com',
      from: new Date(Date.now()),
      services: [
        Service.fromPlain({
          serviceType: ServiceType.CLEANING,
          duration: 20,
          price: 100,
        }),
      ],
    }),
  );

  const allAppointments = await service.getByMasterEmail(
    'b.y.petryshyn@gmail.com',
  );

  console.log(allAppointments);

  // const app = await NestFactory.create(AppModule);
  //
  // app.setGlobalPrefix('/nails');
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //
  // await app.listen(3000);
}
bootstrap();
