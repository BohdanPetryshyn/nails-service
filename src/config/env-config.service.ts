import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly envConfig: ConfigService) {}

  getMongoConnectionString(): string {
    return this.getConfigValue('MONGO_CONNECTION_STRING');
  }

  getJwtSecret(): string {
    return this.getConfigValue('JWT_SECRET');
  }

  private getConfigValue(name: string): string {
    return this.envConfig.get(name);
  }
}
