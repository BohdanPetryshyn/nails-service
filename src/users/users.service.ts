import { Injectable } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { LoginData } from './entities/login-data';
import { User } from './entities/user';
import { UserData } from './entities/user-data';
import { Master } from './entities/master';
import { Client } from './entities/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  async getOrCreate(personalData: LoginData): Promise<User> {
    return this.usersDao.getOrCreate(personalData);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.usersDao.getByEmail(email);
  }

  async getUserDataByEmail(email: string): Promise<UserData | null> {
    const user = await this.usersDao.getByEmail(email);

    if (Master.isMaster(user)) {
      return user.masterData;
    }
    if (Client.isClient(user)) {
      return user.clientData;
    }
  }

  async getLoginDataByEmail(email: string): Promise<LoginData | null> {
    return this.usersDao.getLoginDataByEmail(email);
  }

  async getFullNameByEmails(emails: string[]): Promise<Map<string, string>> {
    return this.usersDao.getFullNameByEmails(emails);
  }
}
