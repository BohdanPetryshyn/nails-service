import { validateSync } from 'class-validator';

export function validate(instance) {
  const validationErrors = validateSync(instance);

  if (validationErrors.length > 0) {
    throw new Error(validationErrors.toString());
  }
}
