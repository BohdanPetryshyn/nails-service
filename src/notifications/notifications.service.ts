import { Injectable, NotFoundException } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';
import { PushTokensService } from './push-tokens-service';

@Injectable()
export class NotificationsService {
  private readonly expoClient: Expo;

  constructor(private readonly pushTokensService: PushTokensService) {
    this.expoClient = new Expo();
  }

  async send(message: Record<string, unknown>, email: string): Promise<void> {
    const pushToken = await this.pushTokensService.get(email);

    if (!pushToken) {
      throw new NotFoundException(
        `User ${email} does not have push token associated.`,
      );
    }

    await this.expoClient.sendPushNotificationsAsync([
      {
        to: pushToken,
        title: 'New Message!',
        data: message,
      },
    ]);
  }
}
