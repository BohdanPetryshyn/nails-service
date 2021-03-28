import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth-response';

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
}
