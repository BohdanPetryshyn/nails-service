import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import { Interval, IntervalConstructorParams } from './interval';

export type WorkingHoursConstructorParams = IntervalConstructorParams;

@Exclude()
@Schema()
export class WorkingHours extends Interval {
  static fromPlain(plain: WorkingHoursConstructorParams) {
    return instantiateAndValidate(WorkingHours, plain);
  }
}
