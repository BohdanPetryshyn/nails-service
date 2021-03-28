import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleUsersService } from './user/google-users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [HttpModule, JwtModule.register({ secret: 'test-secret' })],
  providers: [AuthService, GoogleUsersService],
  controllers: [AuthController],
})
export class AuthModule {}
