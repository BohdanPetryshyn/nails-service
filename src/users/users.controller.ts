import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { User } from './entities/user';
import { UserData } from './entities/user-data';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() request: AuthedRequest): Promise<User> {
    return this.usersService.getByEmail(request.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/:email')
  async getByEmail(@Param('email') email: string): Promise<UserData> {
    return this.usersService.getUserDataByEmail(email);
  }
}
