import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { PushTokenAssociation } from './entities/push-token-association';
import { PushTokensService } from './push-tokens-service';
import { NotificationsService } from './notifications.service';
import { PushTokensDao } from './push-tokens.dao';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: PushTokenAssociation.name,
        schema: SchemaFactory.createForClass(PushTokenAssociation),
      },
    ]),
  ],
  providers: [PushTokensDao, PushTokensService, NotificationsService],
  exports: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
