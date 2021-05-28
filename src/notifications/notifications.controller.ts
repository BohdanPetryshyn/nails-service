import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PushTokensService } from './push-tokens-service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthedRequest } from '../auth/jwt/authed-request';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly pushTokensService: PushTokensService) {}

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  async subscribe(
    @Req() request: AuthedRequest,
    @Body() pushToken: string,
  ): Promise<void> {
    await this.pushTokensService.upsert(request.user.email, pushToken);
  }
}
