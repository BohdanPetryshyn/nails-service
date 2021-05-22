import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async getMe(email: string): Promise<User> {
    return this.usersService.getByEmail(email);
  }
}
