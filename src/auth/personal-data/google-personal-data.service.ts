import { HttpService, Injectable } from '@nestjs/common';
import { PersonalData } from '../../users/entities/personal-data';

@Injectable()
export class GooglePersonalDataService {
  constructor(private readonly http: HttpService) {}

  async get(accessToken: string): Promise<PersonalData> {
    const fetchedUser = await this.http
      .get('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: this.getAuthenticationHeader(accessToken),
        },
      })
      .toPromise()
      .then((response) => response.data);

    return PersonalData.fromPlain({
      email: fetchedUser.email,
      firstName: fetchedUser.given_name,
      lastName: fetchedUser.family_name,
      gender: fetchedUser.gender,
      locale: fetchedUser.locale,
      pictureUrl: fetchedUser.picture,
    });
  }

  private getAuthenticationHeader(accessToken: string): string {
    return `Bearer ${accessToken}`;
  }
}
