import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user';
import { ValidateNested } from 'class-validator';
import { MasterPersonalData } from './master-personal-data';
import instantiateAndValidate from '../../core/validation/instantiate-and-validate';
import { Document } from 'mongoose';
import { createSchemaDiscriminatorForClass } from '../../core/mongoose/create-schema-discriminator-for-class';

@Exclude()
@Schema()
export class Master extends User {
  @Expose()
  @ValidateNested()
  @Type(() => MasterPersonalData)
  @Prop({ required: true })
  personalData: MasterPersonalData;

  static fromPlain(plain: Master) {
    return instantiateAndValidate(Master, plain);
  }
}

export type MasterDocument = Master & Document;

export const MasterSchema = createSchemaDiscriminatorForClass(Master, 'role');
