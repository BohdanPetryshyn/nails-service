import { Injectable, NotFoundException } from '@nestjs/common';
import { MastersDao } from './masters.dao';
import { MasterData } from './entities/master-data';
import { Master } from './entities/master';

@Injectable()
export class MastersService {
  constructor(private readonly mastersDao: MastersDao) {}

  async makeMaster(email: string, masterData: MasterData): Promise<Master> {
    const master = this.mastersDao.makeMaster(email, masterData);

    if (!master) {
      throw new NotFoundException(`User ${email} not found.`);
    }

    return master;
  }
}
