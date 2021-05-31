import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Message } from './entities/message';
import { AuthedRequest } from '../auth/jwt/authed-request';
import { MessageSendRequest } from './entities/message-send-request';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('chats/:email')
  async getChatMessages(
    @Req() request: AuthedRequest,
    @Param('email') withEmail: string,
  ): Promise<Message[]> {
    const ownEmail = request.user.email;
    return this.messagesService.getBetween(ownEmail, withEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Post('chats/:email')
  async sendMessage(
    @Req() request: AuthedRequest,
    @Param('email') toEmail: string,
    @Body() sendRequest: MessageSendRequest,
  ): Promise<Message> {
    const ownEmail = request.user.email;
    const message = Message.fromSendRequest(sendRequest, ownEmail, toEmail);
    await this.messagesService.send(message);
    return message;
  }

  @UseGuards(JwtAuthGuard)
  @Get('chats')
  async getChatPreviews(@Req() request: AuthedRequest) {
    return this.messagesService.getChatPreviews(request.user.email);
  }
}
