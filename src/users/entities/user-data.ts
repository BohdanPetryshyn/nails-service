import { Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserDataConstructorParams {}

@Exclude()
@Schema()
export class UserData {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor({}: UserDataConstructorParams) {}
}
