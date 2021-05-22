import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthedRequest } from './jwt/authed-request';
import { Payload } from './jwt/payload';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() request: AuthedRequest): Promise<User> {
    return this.authService.getMe(request.user.email);
  }
}
