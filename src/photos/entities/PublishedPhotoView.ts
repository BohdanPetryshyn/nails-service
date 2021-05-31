import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import instantiateAndValidate from '../../core/validation/instantiateAndValidate';
import {
  PublishedPhoto,
  PublishedPhotoConstructorParams,
} from './PublishedPhoto';

interface PublishedPhotoViewConstructorParams
  extends PublishedPhotoConstructorParams {
  photoUrl: string;
  userEmail: string;
  publishedDate: string | Date;
}

@Exclude()
export class PublishedPhotoView extends PublishedPhoto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  userFullName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  userProfilePhoto: string;

  static fromPlain(plain: PublishedPhotoViewConstructorParams) {
    return instantiateAndValidate(PublishedPhotoView, plain);
  }
}
