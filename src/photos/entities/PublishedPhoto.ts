import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsUrl } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';

export interface PublishedPhotoConstructorParams {
  photoUrl: string;
  userEmail: string;
  publishedDate: string | Date;
}

@Exclude()
@Schema()
export class PublishedPhoto {
  @Expose()
  @IsUrl()
  @Prop({ required: true })
  photoUrl: string;

  @Expose()
  @IsEmail()
  @Prop({ required: true, index: true })
  userEmail: string;

  @Expose()
  @Type(() => Date)
  @Prop({ required: true, index: -1 })
  publishedDate: Date;

  static fromPlain(plain: PublishedPhotoConstructorParams) {
    return instantiateAndValidate(PublishedPhoto, plain);
  }
}
