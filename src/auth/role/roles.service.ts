import { Injectable } from '@nestjs/common';
import { Role } from '../../users/entities/user';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../jwt/payload';

@Injectable()
export class RolesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async selectRoleAndGenerateNewAccessToken(
    oldPayload: Payload,
    role: Role,
  ): Promise<string> {
    await this.usersService.setRole(oldPayload.email, role);

    const newPayload = oldPayload.withRole(role);

    return this.jwtService.sign(JSON.stringify(newPayload));
  }
}
