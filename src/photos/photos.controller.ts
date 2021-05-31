import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { PublishedPhoto } from './entities/PublishedPhoto';
import { PublishedPhotoView } from './entities/PublishedPhotoView';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<PublishedPhotoView[]> {
    return this.photosService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() request: AuthedRequest,
    @Body('photoUrl') photoUrl: string,
  ): Promise<PublishedPhoto> {
    return this.photosService.publish(photoUrl, request.user.email);
  }
}
