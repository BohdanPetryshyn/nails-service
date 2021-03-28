import { HttpService, Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class GoogleUserService {
  constructor(private readonly http: HttpService) {}

  async get(accessToken: string): Promise<User> {
    const fetchedUser = await this.http
      .get('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: this.getAuthenticationHeader(accessToken),
        },
      })
      .toPromise()
      .then((response) => response.data);

    return {
      email: fetchedUser.email,
      firstName: fetchedUser.given_name,
      lastName: fetchedUser.family_name,
    };
  }

  private getAuthenticationHeader(accessToken: string): string {
    return `Bearer ${accessToken}`;
  }
}
