import { Injectable } from '@nestjs/common';
import { MessagesDao } from './messages.dao';
import { Message } from './entities/message';
import { NotificationsService } from '../notifications/notifications.service';
import { ChatPreview } from './entities/chat-preview';
import { UsersService } from '../users/users.service';
import { UserData } from '../users/entities/user-data';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesDao: MessagesDao,
    private readonly usersService: UsersService,
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

  async getChatPreviews(email: string): Promise<ChatPreview[]> {
    const lastMessages = await this.messagesDao.getLatestByEmail(email);

    const toEmails = lastMessages.map((message) =>
      MessagesService.getToEmail(message, email),
    );
    const usersData = await this.usersService.getUserDataByEmails(toEmails);

    return lastMessages.map((message) => {
      const toEmail = MessagesService.getToEmail(message, email);
      return MessagesService.toChatPreview(
        message,
        toEmail,
        usersData.get(toEmail),
      );
    });
  }

  static getToEmail(message: Message, fromEmail: string): string {
    return message.fromEmail === fromEmail
      ? message.toEmail
      : message.fromEmail;
  }

  static toChatPreview(
    message: Message,
    email: string,
    userData: UserData,
  ): ChatPreview {
    return ChatPreview.fromPlain({
      toEmail: email,
      toFullName: userData.fullName,
      toProfilePhoto: userData.profilePhoto,
      lastMessage: message,
    });
  }
}
