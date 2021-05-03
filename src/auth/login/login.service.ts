import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GooglePersonalDataService } from '../personal-data/google-personal-data.service';
import { UsersService } from '../../users/users.service';
import { Payload } from '../jwt/payload';

@Injectable()
export class LoginService {
  constructor(
    private readonly googlePersonalDataService: GooglePersonalDataService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithGoogleAccessToken(accessToken: string): Promise<string> {
    const userPersonalData = await this.googlePersonalDataService.get(
      accessToken,
    );

    const user = await this.usersService.getOrCreate(userPersonalData);

    const payload = Payload.fromPlain({
      personalData: user.personalData,
      role: user.role,
    });

    return this.jwtService.sign(JSON.stringify(payload));
  }
}
