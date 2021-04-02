import { Exclude, Expose, Type } from 'class-transformer';
import { PersonalData } from '../../users/entities/personal-data';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Role } from '../../users/entities/user';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';

@Exclude()
export class Payload {
  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Expose()
  @ValidateNested()
  @Type(() => PersonalData)
  personalData: PersonalData;

  static fromPlain(plain: Payload) {
    return instantiateAndValidate(Payload, plain);
  }
}
