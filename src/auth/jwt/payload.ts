import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsLocale,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { Role, User } from '../../users/entities/user';

export interface PayloadConstructorParams {
  userId: string;
  email: string;
  role?: Role;
  locale: string;
}

@Exclude()
export class Payload {
  @Expose()
  @IsMongoId()
  userId: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Expose()
  @IsLocale()
  locale: string;

  constructor({ userId, email, role, locale }: PayloadConstructorParams) {
    this.userId = userId;
    this.email = email;
    this.role = role;
    this.locale = locale;
  }

  withRole(role: Role): Payload {
    return new Payload({
      ...this,
      role,
    });
  }

  static fromUser(user: User): Payload {
    return new Payload({
      ...user,
      userId: user.id,
    });
  }
}
