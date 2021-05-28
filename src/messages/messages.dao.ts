import { Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { Message } from './entities/message';
import { InjectModel } from '@nestjs/mongoose';

type MessageDocument = Message & Document;

@Injectable()
export class MessagesDao {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(message: Message): Promise<Message> {
    const messageDocument = await this.messageModel.create(message);

    return Message.fromPlain(messageDocument);
  }

  async getBetween(email1: string, email2: string): Promise<Message[]> {
    const messageDocuments = await this.messageModel
      .find({
        $or: [
          { fromEmail: email1, toEmail: email2 },
          { fromEmail: email2, toEmail: email1 },
        ],
      })
      .exec();

    return messageDocuments.map(Message.fromPlain);
  }

  async getLatestByEmail(email: string): Promise<Message[]> {
    const messageDocuments = await this.messageModel
      .find({
        $or: [{ fromEmail: email }, { toEmail: email }],
      })
      .sort({ sentAt: -1 })
      .limit(1)
      .exec();

    return messageDocuments.map(Message.fromPlain);
  }
}
