import { Role, User } from './user';
import { Client } from './client';
import { Master } from './master';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';

const DISCRIMINATORS = {
  [Role.CLIENT]: Client,
  [Role.MASTER]: Master,
};

export function instantiateAndValidateUser(plain: User) {
  const discriminatorType = DISCRIMINATORS[plain.role];
  return instantiateAndValidate(discriminatorType || User, plain);
}
