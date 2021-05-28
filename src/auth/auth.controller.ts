import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthedRequest } from './jwt/authed-request';
import { AuthService } from './auth.service';
import { LoginData } from '../users/entities/login-data';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-login-data')
  async getLoginData(@Req() request: AuthedRequest): Promise<LoginData> {
    return this.authService.getMyLoginData(request.user.email);
  }
}
