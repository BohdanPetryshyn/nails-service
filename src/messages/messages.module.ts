import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './entities/message';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: SchemaFactory.createForClass(Message) },
    ]),
  ],
})
export class MessagesModule {}
