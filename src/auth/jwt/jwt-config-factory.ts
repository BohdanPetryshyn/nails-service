import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { EnvConfigService } from '../../config/env-config.service';

@Injectable()
export class JwtConfigFactory implements JwtOptionsFactory {
  constructor(private readonly configService: EnvConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.getJwtSecret(),
    };
  }
}
