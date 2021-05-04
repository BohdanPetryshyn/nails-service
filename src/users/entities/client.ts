import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user';
import { ValidateNested } from 'class-validator';
import { ClientPersonalData } from './client-personal-data';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';
import { Document } from 'mongoose';
import { createSchemaDiscriminatorForClass } from '../../core/mongoose/create-schema-discriminator-for-class';

@Exclude()
@Schema()
export class Client extends User {
  @Expose()
  @ValidateNested()
  @Type(() => ClientPersonalData)
  @Prop({ required: true })
  personalData: ClientPersonalData;

  static fromPlain(plain: Client) {
    return instantiateAndValidate(Client, plain);
  }
}

export type ClientDocument = Client & Document;

export const ClientSchema = createSchemaDiscriminatorForClass(Client, 'role');
