import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, User, UserSchema } from './entities/user';
import { UsersDao } from './users.dao';
import { MongoModule } from '../mongo/mongo.module';
import { UsersService } from './users.service';
import { ClientSchema } from './entities/client';
import { MasterSchema } from './entities/master';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Role.CLIENT, schema: ClientSchema },
          { name: Role.MASTER, schema: MasterSchema },
        ],
      },
    ]),
  ],
  providers: [UsersDao, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
