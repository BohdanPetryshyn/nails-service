import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Role, User } from './entities/user';
import { UsersDao } from './users.dao';
import { MongoModule } from '../mongo/mongo.module';
import { UsersService } from './users.service';
import { Client } from './entities/client';
import { Master } from './entities/master';
import { MastersDao } from './masters.dao';
import { MastersService } from './masters.service';
import { ClientsDao } from './clients.dao';
import { ClientsService } from './clients.service';
import { createSchemaDiscriminatorForClass } from '../core/mongoose/create-schema-discriminator-for-class';
import { MastersController } from './masters.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: SchemaFactory.createForClass(User),
        discriminators: [
          {
            name: Role.CLIENT,
            schema: createSchemaDiscriminatorForClass(Client, 'role'),
          },
          {
            name: Role.MASTER,
            schema: createSchemaDiscriminatorForClass(Master, 'role'),
          },
        ],
      },
    ]),
  ],
  providers: [
    UsersDao,
    MastersDao,
    ClientsDao,
    UsersService,
    MastersService,
    ClientsService,
  ],
  controllers: [UsersController, MastersController],
  exports: [UsersService, MastersService, ClientsService],
})
export class UsersModule {}
