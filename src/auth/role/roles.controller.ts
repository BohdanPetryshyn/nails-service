import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '../../users/entities/user';
import { AuthResponse } from '../auth-response';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { AuthedRequest } from '../jwt/authed-request';
import { RolesService } from './roles.service';
import { UserData } from '../../users/entities/user-data';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('select')
  async selectRole(
    @Req() request: AuthedRequest,
    @Body('role') role: Role,
    @Body('userData') userData: UserData,
  ): Promise<AuthResponse> {
    const accessToken = await this.rolesService.selectRoleAndGenerateNewAccessToken(
      request.user,
      role,
      userData,
    );

    return {
      accessToken,
    };
  }
}
