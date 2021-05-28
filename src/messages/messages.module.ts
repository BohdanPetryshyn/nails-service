import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './entities/message';
import { PushTokenAssociation } from './entities/push-token-association';
import { MessagesDao } from './messages.dao';
import { PushTokensDao } from './push-tokens.dao';
import { MessagesService } from './messages.service';
import { PushTokensService } from './push-tokens-service';
import { NotificationsService } from './notifications.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: SchemaFactory.createForClass(Message) },
      {
        name: PushTokenAssociation.name,
        schema: SchemaFactory.createForClass(PushTokenAssociation),
      },
    ]),
  ],
  providers: [
    MessagesDao,
    PushTokensDao,
    MessagesService,
    PushTokensService,
    NotificationsService,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
