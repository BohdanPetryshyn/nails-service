import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'eu-central-1',
    });
  }

  async getPhotoUploadSignedUrl(): Promise<string> {
    const putCommand = new PutObjectCommand({
      Bucket: 'nails-user-photos',
      Key: uuidv4(),
    });
    return getSignedUrl(this.s3Client, putCommand, {
      expiresIn: 300,
    });
  }
}
