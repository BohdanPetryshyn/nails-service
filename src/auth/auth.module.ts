import { HttpModule, Module } from '@nestjs/common';
import { GooglePersonalDataService } from './personal-data/google-personal-data.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtConfigFactory } from './jwt/jwt-config-factory';
import { AppConfigModule } from '../config/app-config.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

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
  providers: [LoginService, GooglePersonalDataService, JwtStrategy],
  controllers: [AuthController, LoginController],
})
export class AuthModule {}
