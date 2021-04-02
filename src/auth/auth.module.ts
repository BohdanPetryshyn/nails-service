import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleUsersService } from './personal-data/google-users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [HttpModule, JwtModule.register({ secret: 'test-secret' })],
  providers: [AuthService, GoogleUsersService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
