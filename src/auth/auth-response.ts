import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import instantiateAndValidate from '../core/validation/instantiateAndValidate';

interface AuthResponseConstructorParams {
  accessToken: string;
}

@Exclude()
export class AuthResponse {
  @Expose()
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  static fromPlain(plain: AuthResponseConstructorParams) {
    return instantiateAndValidate(AuthResponse, plain);
  }
}
