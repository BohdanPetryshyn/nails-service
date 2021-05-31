import { Injectable } from '@nestjs/common';
import { PhotosDao } from './photos.dao';
import { PublishedPhoto } from './entities/PublishedPhoto';
import { PublishedPhotoView } from './entities/PublishedPhotoView';

@Injectable()
export class PhotosService {
  constructor(private readonly photosDao: PhotosDao) {}

  async getAll(): Promise<PublishedPhotoView[]> {
    return this.photosDao.getAll();
  }

  async publish(photoUrl: string, userEmail: string): Promise<PublishedPhoto> {
    const publishedPhoto = PublishedPhoto.fromPlain({
      photoUrl,
      userEmail,
      publishedDate: new Date(),
    });
    return this.photosDao.create(publishedPhoto);
  }
}
