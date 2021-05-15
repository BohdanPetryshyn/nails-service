import { Injectable, NotFoundException } from '@nestjs/common';
import { MastersDao } from './masters.dao';
import { MasterPersonalData } from './entities/master-personal-data';
import { Master } from './entities/master';

@Injectable()
export class MastersService {
  constructor(private readonly mastersDao: MastersDao) {}

  async update(personalData: MasterPersonalData): Promise<Master> {
    const updatedMaster = await this.mastersDao.update(personalData);

    if (!updatedMaster) {
      throw new NotFoundException(
        `Master with ID ${personalData.email} doesn't exist.`,
      );
    }

    return updatedMaster;
  }
}
