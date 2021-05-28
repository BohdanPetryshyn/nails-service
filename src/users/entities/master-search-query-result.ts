import {
  MasterSearchResult,
  MasterSearchResultConstructorParams,
} from './master-search-result';
import { Exclude, Expose, Type } from 'class-transformer';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import { ValidateNested } from 'class-validator';
import { Interval, IntervalConstructorParams } from './interval';
import { DateUtils } from '../../core/utils/date.utils';
import { WorkingHours, WorkingHoursConstructorParams } from './working-hours';

interface MasterSearchQueryResultConstructorParams
  extends MasterSearchResultConstructorParams {
  appointment: IntervalConstructorParams[];
  workingHours: WorkingHoursConstructorParams[];
}

@Exclude()
export class MasterSearchQueryResult extends MasterSearchResult {
  @Expose()
  @Type(() => Interval)
  @ValidateNested()
  appointments: Interval[];

  @Expose()
  @Type(() => WorkingHours)
  @ValidateNested()
  workingHours: WorkingHours[];

  static fromPlain(plain: MasterSearchQueryResultConstructorParams) {
    return instantiateAndValidate(MasterSearchQueryResult, plain);
  }

  isAvailable(from: Date) {
    const to = DateUtils.addMinutes(from, this.duration);
    const serviceInterval = Interval.fromPlain({ from, to });

    const isDuringWorkingHours = this.workingHours.some((workingHours) =>
      serviceInterval.isIn(workingHours),
    );

    const isOutsideAppointments = this.appointments.every((appointment) =>
      serviceInterval.isOutside(appointment),
    );

    return isDuringWorkingHours && isOutsideAppointments;
  }
}
