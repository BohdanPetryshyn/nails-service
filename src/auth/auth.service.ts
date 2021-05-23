import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user';
import { LoginData } from '../users/entities/login-data';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async getMyLoginData(email: string): Promise<LoginData> {
    const loginData = await this.usersService.getLoginDataByEmail(email);

    if (!loginData) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return loginData;
  }
}
