import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleUserService } from './user/google-user.service';

@Module({
  imports: [HttpModule],
  providers: [AuthService, GoogleUserService],
})
export class AuthModule {}
