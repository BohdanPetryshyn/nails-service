import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { User } from './entities/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() request: AuthedRequest): Promise<User> {
    return this.usersService.getByEmail(request.user.email);
  }
}
