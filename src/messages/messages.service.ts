import { Injectable } from '@nestjs/common';
import { MessagesDao } from './messages.dao';
import { Message } from './entities/message';
import { PushTokensService } from './push-tokens-service';
import { NotificationsService } from './notifications.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesDao: MessagesDao,
    private readonly pushTokensService: PushTokensService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async send(message: Message): Promise<void> {
    const toUserEmail = message.toEmail;
    const toUserPushToken = await this.pushTokensService.get(toUserEmail);

    await Promise.all([
      this.messagesDao.create(message),
      this.notificationsService.send(message.toPlain(), toUserPushToken),
    ]);
  }

  async getBetween(email1: string, email2: string): Promise<Message[]> {
    return this.messagesDao.getBetween(email1, email2);
  }

  async getLatestByEmail(email: string): Promise<Message[]> {
    return this.messagesDao.getLatestByEmail(email);
  }
}
