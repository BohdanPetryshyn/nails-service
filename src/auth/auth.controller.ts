import { Body, Controller, Get, Req, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth-response';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthedRequest } from './jwt/authed-request';
import { Payload } from './jwt/payload';

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
  getMe(@Req() request: AuthedRequest): Payload {
    return request.user;
  }
}
