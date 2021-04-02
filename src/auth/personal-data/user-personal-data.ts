import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsLocale, IsNotEmpty, IsUrl } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';

@Exclude()
export class UserPersonalData {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  gender: string;

  @Expose()
  @IsLocale()
  locale: string;

  @Expose()
  @IsUrl()
  pictureUrl: string;

  static fromPlain(checkRequest: UserPersonalData) {
    return instantiateAndValidate(UserPersonalData, checkRequest);
  }
}
