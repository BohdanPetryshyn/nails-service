import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user';
import { IsMongoId, ValidateNested } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ClientInfoConstructorParams {}

interface ClientCoreConstructorParams extends ClientInfoConstructorParams {
  user: string;
}

interface ClientConstructorParams {
  user: string;
  id: string;
}

interface ClientPopulatedConstructorParams {
  id: string;
  user: User;
}

@Exclude()
@Schema()
export class ClientInfo {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor({}: ClientInfoConstructorParams) {}
}

@Exclude()
@Schema()
export class ClientCore extends ClientInfo {
  @Expose()
  @IsMongoId()
  @Prop({
    type: String,
    ref: User.name,
    required: true,
  })
  user: string;

  constructor({ user }: ClientCoreConstructorParams) {
    super({});
    this.user = user;
  }
}

@Exclude()
@Schema()
export class Client extends ClientCore {
  @Expose()
  @IsMongoId()
  id: string;

  constructor({ user, id }: ClientConstructorParams) {
    super({ user });
    this.id = id;
  }
}

@Exclude()
@Schema()
export class ClientPopulated extends ClientInfo {
  @Expose()
  @IsMongoId()
  id: string;

  @Expose()
  @Type(() => User)
  @ValidateNested()
  user: User;

  constructor({ id, user }: ClientPopulatedConstructorParams) {
    super({});
    this.id = id;
    this.user = user;
  }
}
