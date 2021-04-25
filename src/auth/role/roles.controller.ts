import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '../../users/entities/user';
import { AuthResponse } from '../auth-response';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { AuthedRequest } from '../jwt/authed-request';
import { RolesService } from './roles.service';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('select')
  async selectRole(
    @Body('role') role: Role,
    @Req() request: AuthedRequest,
  ): Promise<AuthResponse> {
    const accessToken = await this.rolesService.selectRoleAndGenerateNewAccessToken(
      request.user,
      role,
    );

    return {
      accessToken,
    };
  }
}
