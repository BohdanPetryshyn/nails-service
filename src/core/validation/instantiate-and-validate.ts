import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export default function instantiateAndValidate<T>(
  type: ClassConstructor<T>,
  plain: T,
) {
  const instance = plainToClass(type, plain, {});
  validate(instance);
  return instance;
}

function validate(instance) {
  const validationErrors = validateSync(instance);

  if (validationErrors.length > 0) {
    throw new Error(validationErrors.toString());
  }
}
