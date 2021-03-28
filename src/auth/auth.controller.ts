import { Body, Controller, Get, Req, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth-response';
import { User } from './users/user';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthedRequest } from './users/authed-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google-login')
  async loginWithGoogle(
    @Body('accessToken') googleAccessToken: string,
  ): Promise<AuthResponse> {
    const accessToken = await this.authService.loginWithGoogleAccessToken(
      googleAccessToken,
    );

    return {
      accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() request: AuthedRequest): User {
    return request.user;
  }
}
