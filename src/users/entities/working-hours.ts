import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

interface WorkingHoursConstructorParams {
  from: Date;
  to: Date;
}

@Exclude()
@Schema()
export class WorkingHours {
  @Expose()
  @Type(() => Date)
  @Prop({ required: true, index: true })
  from: Date;

  @Expose()
  @Type(() => Date)
  @Prop({ required: true, index: true })
  to: Date;

  static fromPlain(plain: WorkingHoursConstructorParams) {
    return instantiateAndValidate(WorkingHours, plain);
  }
}
