export class DateUtils {
  static addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60_000);
  }

  static before(first: Date, second: Date): boolean {
    return first.getTime() < second.getTime();
  }

  static after(first: Date, second: Date): boolean {
    return first.getTime() > second.getTime();
  }
}
