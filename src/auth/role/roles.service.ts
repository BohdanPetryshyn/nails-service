import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '../../users/entities/user';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../jwt/payload';
import { MasterData } from '../../users/entities/master-data';
import { UserData } from '../../users/entities/user-data';
import { ClientsService } from '../../users/clients.service';
import { MastersService } from '../../users/masters.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly mastersService: MastersService,
    private readonly jwtService: JwtService,
  ) {}

  async selectRoleAndGenerateNewAccessToken(
    oldPayload: Payload,
    role: Role,
    userData: UserData,
  ): Promise<string> {
    await this.setUserRoleAndData(oldPayload.email, role, userData);

    const newPayload = oldPayload.withRole(role);

    return this.jwtService.sign(JSON.stringify(newPayload));
  }

  private async setUserRoleAndData(
    email: string,
    role: Role,
    userData: UserData,
  ): Promise<void> {
    switch (role) {
      case Role.CLIENT:
        await this.clientsService.makeClient(email, userData as ClientData);
        break;
      case Role.MASTER:
        await this.mastersService.makeMaster(email, userData as MasterData);
        break;
      default:
        throw new BadRequestException(
          `Can't set role ${role} to user ${email}`,
        );
    }
  }
}
