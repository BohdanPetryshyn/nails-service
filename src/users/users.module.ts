import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user';
import { UsersDao } from './users.dao';
import { MongoModule } from '../mongo/mongo.module';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersDao, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
