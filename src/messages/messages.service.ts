import { Injectable } from '@nestjs/common';
import { MessagesDao } from './messages.dao';
import { Message } from './entities/message';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesDao: MessagesDao,
    private readonly notificationsService: NotificationsService,
  ) {}

  async send(message: Message): Promise<void> {
    const toUserEmail = message.toEmail;

    await Promise.all([
      this.messagesDao.create(message),
      this.notificationsService.send(message.toPlain(), toUserEmail),
    ]);
  }

  async getBetween(email1: string, email2: string): Promise<Message[]> {
    return this.messagesDao.getBetween(email1, email2);
  }

  async getLatestByEmail(email: string): Promise<Message[]> {
    return this.messagesDao.getLatestByEmail(email);
  }
}
