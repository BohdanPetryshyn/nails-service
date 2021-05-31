import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PublishedPhoto } from './entities/PublishedPhoto';
import { Document, Model } from 'mongoose';
import { PublishedPhotoView } from './entities/PublishedPhotoView';
import { photosWithUserData } from './queries/photos-with-user-data.query';

type PublishedPhotoDocument = PublishedPhoto & Document;

@Injectable()
export class PhotosDao {
  constructor(
    @InjectModel(PublishedPhoto.name)
    private readonly publishedPhotoModel: Model<PublishedPhotoDocument>,
  ) {}

  async getAll(): Promise<PublishedPhotoView[]> {
    const photoViewDocuments = await this.publishedPhotoModel
      .aggregate(photosWithUserData())
      .exec();

    return photoViewDocuments.map(PublishedPhotoView.fromPlain);
  }

  async create(photo: PublishedPhoto): Promise<PublishedPhoto> {
    const photoDocument = await this.publishedPhotoModel.create(photo);
    return PublishedPhoto.fromPlain(photoDocument);
  }
}
