import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '../config/env-config.service';

@Injectable()
export class MongooseConfigFactory implements MongooseOptionsFactory {
  constructor(private readonly configService: EnvConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.getMongoConnectionString(),
    };
  }
}
