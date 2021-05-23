import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsLocale, IsOptional } from 'class-validator';
import { Role, User } from '../../users/entities/user';
import { Prop } from '@nestjs/mongoose';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

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

  static fromPlain(plain: PayloadConstructorParams) {
    return instantiateAndValidate(Payload, plain);
  }

  static fromUser(user: User) {
    return Payload.fromPlain({
      role: user.role,
      email: user.loginData.email,
      locale: user.loginData.locale,
    });
  }

  withRole(role: Role): Payload {
    return Payload.fromPlain({ ...this, role });
  }
}
