import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsLocale, IsOptional } from 'class-validator';
import { Role, User } from '../../users/entities/user';
import { Prop } from '@nestjs/mongoose';
import { validate } from '../../core/validation/validate';

interface PayloadConstructorParams {
  role?: Role;
  email: string;
  locale: string;
}

@Exclude()
export class Payload {
  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Expose()
  @IsEmail()
  @Prop({ required: true })
  email: string;

  @Expose()
  @IsLocale()
  @Prop({ required: true })
  locale: string;

  constructor({ role, email, locale }: PayloadConstructorParams) {
    this.role = role;
    this.email = email;
    this.locale = locale;

    validate(this);
  }

  static fromUser(user: User) {
    return new Payload({
      role: user.role,
      email: user.personalData.email,
      locale: user.personalData.locale,
    });
  }

  withRole(role: Role): Payload {
    return new Payload({ ...this, role });
  }
}
