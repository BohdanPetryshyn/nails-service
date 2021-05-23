import { Injectable } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { LoginData } from './entities/login-data';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  async getOrCreate(personalData: LoginData): Promise<User> {
    return this.usersDao.getOrCreate(personalData);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.usersDao.getByEmail(email);
  }
}
