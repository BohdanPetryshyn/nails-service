import { Injectable } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { PersonalData } from './entities/personal-data';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  getOrCreate(personalData: PersonalData): Promise<User> {
    return this.usersDao.getOrCreate(personalData);
  }
}
