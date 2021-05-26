import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

interface ParseDatePipeConstructorParams {
  isOptional: boolean;
}

@Injectable()
export class ParseDatePipe implements PipeTransform<Date, Date | undefined> {
  private readonly isOptional: boolean;

  constructor({ isOptional }: ParseDatePipeConstructorParams) {
    this.isOptional = isOptional;
  }

  transform(value: Date, metadata: ArgumentMetadata) {
    if (!ParseDatePipe.isValidDate(value)) {
      if (this.isOptional) {
        return undefined;
      }
      throw new BadRequestException(
        `Parameter ${metadata.data} should represent a valid Date.`,
      );
    }

    return value;
  }

  private static isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}
