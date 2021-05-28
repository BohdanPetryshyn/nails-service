import { Injectable } from '@nestjs/common';
import { MessagesDao } from './messages.dao';
import { Message } from './entities/message';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesDao: MessagesDao) {}

  async getBetween(email1: string, email2: string): Promise<Message[]> {
    return this.messagesDao.getBetween(email1, email2);
  }

  async getLatestByEmail(email: string): Promise<Message[]> {
    return this.messagesDao.getLatestByEmail(email);
  }
}
