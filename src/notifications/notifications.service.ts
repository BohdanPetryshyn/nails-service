import { Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';
import { PushTokensService } from './push-tokens-service';

@Injectable()
export class NotificationsService {
  private readonly expoClient: Expo;

  constructor(private readonly pushTokensService: PushTokensService) {
    this.expoClient = new Expo();
  }

  async send(message: Record<string, unknown>, email: string) {
    const pushToken = await this.pushTokensService.get(email);

    await this.expoClient.sendPushNotificationsAsync([
      {
        to: pushToken,
        data: message,
      },
    ]);
  }
}
