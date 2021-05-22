import { HttpService, Injectable } from '@nestjs/common';
import { LoginData } from '../../users/entities/login-data';

@Injectable()
export class GooglePersonalDataService {
  constructor(private readonly http: HttpService) {}

  async get(accessToken: string): Promise<LoginData> {
    const fetchedUser = await this.http
      .get('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: this.getAuthenticationHeader(accessToken),
        },
      })
      .toPromise()
      .then((response) => response.data);

    return new LoginData({
      email: fetchedUser.email,
      firstName: fetchedUser.given_name,
      lastName: fetchedUser.family_name,
      gender: fetchedUser.gender,
      locale: fetchedUser.locale,
      profilePhoto: fetchedUser.picture,
    });
  }

  private getAuthenticationHeader(accessToken: string): string {
    return `Bearer ${accessToken}`;
  }
}
