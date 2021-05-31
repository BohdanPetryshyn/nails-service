import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { MongoModule } from '../mongo/mongo.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { PublishedPhoto } from './entities/PublishedPhoto';
import { PhotosDao } from './photos.dao';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: PublishedPhoto.name,
        schema: SchemaFactory.createForClass(PublishedPhoto),
      },
    ]),
  ],
  providers: [PhotosDao, PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
