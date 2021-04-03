import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GooglePersonalDataService } from './personal-data/google-personal-data.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtConfigFactory } from './jwt/jwt-config-factory';
import { AppConfigModule } from '../config/app-config.module';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useClass: JwtConfigFactory,
    }),
  ],
  providers: [AuthService, GooglePersonalDataService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
