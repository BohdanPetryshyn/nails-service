import { Injectable } from '@nestjs/common';
import { PushTokensDao } from './push-tokens.dao';

@Injectable()
export class PushTokensService {
  constructor(private readonly pushTokensDao: PushTokensDao) {}

  async get(email: string): Promise<string | null> {
    return this.pushTokensDao.get(email);
  }

  async upsert(email: string, token: string): Promise<void> {
    await this.pushTokensDao.upsert(email, token);
  }
}
