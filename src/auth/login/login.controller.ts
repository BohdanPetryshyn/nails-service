import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponse } from '../auth-response';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('google')
  async loginWithGoogle(
    @Body('accessToken') googleAccessToken: string,
  ): Promise<AuthResponse> {
    const accessToken = await this.loginService.loginWithGoogleAccessToken(
      googleAccessToken,
    );

    return {
      accessToken,
    };
  }
}
