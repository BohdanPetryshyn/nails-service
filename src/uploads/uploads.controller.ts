import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('photo-signed-url')
  async getPhotoUploadSignedUrl(): Promise<string> {
    return this.uploadsService.getPhotoUploadSignedUrl();
  }
}
