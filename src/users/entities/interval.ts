import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import { DateUtils } from '../../core/utils/date.utils';

export interface IntervalConstructorParams {
  from: Date;

  to: Date;
}

@Exclude()
export class Interval {
  @Expose()
  @Type(() => Date)
  @ValidateNested()
  from: Date;

  @Expose()
  @Type(() => Date)
  @ValidateNested()
  to: Date;

  static fromPlain(plain: IntervalConstructorParams) {
    return instantiateAndValidate(Interval, plain);
  }

  isIn(other: Interval): boolean {
    return (
      DateUtils.before(other.from, this.from) &&
      DateUtils.after(other.to, this.to)
    );
  }

  isOutside(other: Interval): boolean {
    return (
      DateUtils.before(this.to, other.from) ||
      DateUtils.after(this.from, other.to)
    );
  }
}
