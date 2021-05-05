import { Exclude, Expose, Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { Role, User } from './user';
import { ValidateNested } from 'class-validator';
import { MasterPersonalData } from './master-personal-data';
import { Document } from 'mongoose';
import { createSchemaDiscriminatorForClass } from '../../core/mongoose/create-schema-discriminator-for-class';
import { validate } from '../../core/validation/validate';

interface MasterConstructorParams {
  personalData: MasterPersonalData;
}

@Exclude()
@Schema()
export class Master extends User {
  @Expose()
  @ValidateNested()
  @Type(() => MasterPersonalData)
  @Prop({ required: true })
  personalData: MasterPersonalData;

  constructor({ personalData }: MasterConstructorParams) {
    super({ personalData });
    this.personalData = personalData;
    this.role = Role.MASTER;

    validate(this);
  }
}

export type MasterDocument = Master & Document;

export const MasterSchema = createSchemaDiscriminatorForClass(Master, 'role');
