import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { Role, User } from './user';
import { ValidateNested } from 'class-validator';
import { ClientPersonalData } from './client-personal-data';
import { Document } from 'mongoose';
import { createSchemaDiscriminatorForClass } from '../../core/mongoose/create-schema-discriminator-for-class';
import { validate } from '../../core/validation/validate';

interface ClientConstructorParams {
  personalData: ClientPersonalData;
}

@Exclude()
@Schema()
export class Client extends User {
  @Expose()
  @ValidateNested()
  @Type(() => ClientPersonalData)
  @Prop({ required: true })
  personalData: ClientPersonalData;

  constructor({ personalData }: ClientConstructorParams) {
    super({ personalData });
    this.personalData = personalData;
    this.role = Role.CLIENT;

    validate(this);
  }
}

export type ClientDocument = Client & Document;

export const ClientSchema = createSchemaDiscriminatorForClass(Client, 'role');
