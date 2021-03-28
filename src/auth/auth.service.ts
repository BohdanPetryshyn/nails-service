import { Injectable } from '@nestjs/common';
import { GoogleUsersService } from './users/google-users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly googleUsersService: GoogleUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithGoogleAccessToken(accessToken: string): Promise<string> {
    const user = await this.googleUsersService.get(accessToken);

    return this.jwtService.sign(user);
  }
}
