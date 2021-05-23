import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { IsInt } from 'class-validator';

@Exclude()
@Schema()
export class WorkingHours {
  @Expose()
  @IsInt()
  @Prop({ required: true, index: true })
  from: number;

  @Expose()
  @IsInt()
  @Prop({ required: true, index: true })
  to: number;
}
