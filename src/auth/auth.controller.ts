import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthedRequest } from './jwt/authed-request';
import { Payload } from './jwt/payload';

@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() request: AuthedRequest): Payload {
    return request.user;
  }
}
