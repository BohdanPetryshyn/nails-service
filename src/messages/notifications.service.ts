import { Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  private readonly expoClient: Expo;

  constructor() {
    this.expoClient = new Expo();
  }

  async send(message: Record<string, unknown>, token: string) {
    await this.expoClient.sendPushNotificationsAsync([
      {
        to: token,
        data: message,
      },
    ]);
  }
}
