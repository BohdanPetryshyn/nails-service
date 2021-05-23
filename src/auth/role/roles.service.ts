import { Injectable } from '@nestjs/common';
import { Role } from '../../users/entities/user';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../jwt/payload';
import { MasterData } from '../../users/entities/master-data';
import { ClientData } from '../../users/entities/client-data';
import { ClientsService } from '../../users/clients.service';
import { MastersService } from '../../users/masters.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly mastersService: MastersService,
    private readonly jwtService: JwtService,
  ) {}

  async selectClientRoleAndGenerateNewAccessToken(
    oldPayload: Payload,
    clientData: ClientData,
  ): Promise<string> {
    await this.clientsService.makeClient(oldPayload.email, clientData);

    return this.getNewPayloadWithRole(oldPayload, Role.CLIENT);
  }

  async selectMasterRoleAndGenerateNewAccessToken(
    oldPayload: Payload,
    masterData: MasterData,
  ): Promise<string> {
    await this.mastersService.makeMaster(oldPayload.email, masterData);

    return this.getNewPayloadWithRole(oldPayload, Role.MASTER);
  }

  private getNewPayloadWithRole(oldPayload: Payload, role: Role): string {
    const newPayload = oldPayload.withRole(role);
    return this.jwtService.sign(JSON.stringify(newPayload));
  }
}
