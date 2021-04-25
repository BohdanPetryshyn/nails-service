import { Injectable } from '@nestjs/common';
import { Role, User } from '../../users/entities/user';
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
    user: User,
    role: Role,
  ): Promise<string> {
    await this.usersService.setRole(user.personalData.email, role);

    const newPayload = Payload.fromPlain({
      personalData: user.personalData,
      role,
    });

    return this.jwtService.sign(JSON.stringify(newPayload));
  }
}
