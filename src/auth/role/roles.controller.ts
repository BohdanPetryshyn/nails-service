import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthResponse } from '../auth-response';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { AuthedRequest } from '../jwt/authed-request';
import { RolesService } from './roles.service';
import { ClientData } from '../../users/entities/client-data';
import { MasterData } from '../../users/entities/master-data';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('select-client')
  async selectClientRole(
    @Req() request: AuthedRequest,
    @Body('userData') userData: ClientData,
  ): Promise<AuthResponse> {
    const accessToken = await this.rolesService.selectClientRoleAndGenerateNewAccessToken(
      request.user,
      userData,
    );

    return AuthResponse.fromPlain({ accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Post('select-master')
  async selectMasterRole(
    @Req() request: AuthedRequest,
    @Body('userData') userData: MasterData,
  ): Promise<AuthResponse> {
    const accessToken = await this.rolesService.selectMasterRoleAndGenerateNewAccessToken(
      request.user,
      userData,
    );

    return AuthResponse.fromPlain({ accessToken });
  }
}
