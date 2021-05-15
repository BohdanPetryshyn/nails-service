import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from './entities/user';
import { UsersDao } from './users.dao';
import { MongoModule } from '../mongo/mongo.module';
import { UsersService } from './users.service';
import { Client } from './entities/client';
import { Master } from './entities/master';
import { MastersDao } from './masters.dao';
import { MastersService } from './masters.service';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: SchemaFactory.createForClass(User),
      },
      {
        name: Client.name,
        schema: SchemaFactory.createForClass(Client),
      },
      {
        name: Master.name,
        schema: SchemaFactory.createForClass(Master),
      },
    ]),
  ],
  providers: [UsersDao, MastersDao, UsersService, MastersService],
  exports: [UsersService],
})
export class UsersModule {}
