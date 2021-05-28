import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './entities/message';
import { MessagesDao } from './messages.dao';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    MongoModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: SchemaFactory.createForClass(Message) },
    ]),
  ],
  providers: [MessagesDao, MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
