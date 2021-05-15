import { ConflictException, Injectable } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { Role, User, UserCore } from './entities/user';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  getOrCreate(user: UserCore): Promise<User> {
    return this.usersDao.getOrCreate(user);
  }

  async setRole(userId: string, role: Role): Promise<void> {
    const updatedUser = await this.usersDao.setRoleIfNotSet(userId, role);

    if (!updatedUser) {
      throw new ConflictException(`User ${userId} already has role assigned.`);
    }
  }
}
