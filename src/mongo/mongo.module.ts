import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/app-config.module';
import { MongooseConfigFactory } from './mongoose-config-factory';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: MongooseConfigFactory,
    }),
  ],
})
export class MongoModule {}
