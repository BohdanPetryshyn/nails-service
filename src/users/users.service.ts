import { ConflictException, Injectable } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { PersonalData } from './entities/personal-data';
import { Role, User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  getOrCreate(personalData: PersonalData): Promise<User> {
    return this.usersDao.getOrCreate(personalData);
  }

  async setRole(email: string, role: Role): Promise<void> {
    const updatedUser = await this.usersDao.setRoleIfNotSet(email, role);

    if (!updatedUser) {
      throw new ConflictException(`User ${email} already has role assigned.`);
    }
  }
}
