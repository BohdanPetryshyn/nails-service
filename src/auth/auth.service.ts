import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GooglePersonalDataService } from './personal-data/google-personal-data.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly googlePersonalDataService: GooglePersonalDataService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithGoogleAccessToken(accessToken: string): Promise<string> {
    const user = await this.googlePersonalDataService.get(accessToken);

    return this.jwtService.sign(user);
  }
}
