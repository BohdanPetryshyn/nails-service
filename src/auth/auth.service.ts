import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async getMe(email: string): Promise<User> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }
}
