import { Injectable, NotFoundException } from '@nestjs/common';
import { MastersDao } from './masters.dao';
import { MasterData } from './entities/master-data';
import { Master } from './entities/master';
import { WorkingHours } from './entities/working-hours';
import { ServiceType } from './entities/service-type';
import { City } from './entities/city';
import { MasterSearchResult } from './entities/master-search-result';

@Injectable()
export class MastersService {
  constructor(private readonly mastersDao: MastersDao) {}

  async getAll(): Promise<Master[]> {
    return this.mastersDao.getAll();
  }

  async getByEmail(email: string): Promise<Master | null> {
    return this.mastersDao.getByEmail(email);
  }

  async search(
    from: Date,
    services: ServiceType[],
    city: City,
  ): Promise<MasterSearchResult[]> {
    return this.mastersDao.search(from, services, city);
  }

  async makeMaster(email: string, masterData: MasterData): Promise<Master> {
    const master = this.mastersDao.makeMaster(email, masterData);

    if (!master) {
      throw new NotFoundException(`User ${email} not found.`);
    }

    return master;
  }

  async addWorkingHours(
    email: string,
    workingHours: WorkingHours,
  ): Promise<void> {
    const updateResult = await this.mastersDao.addWorkingHours(
      email,
      workingHours,
    );

    if (!updateResult) {
      throw new NotFoundException(`User ${email} not found.`);
    }
  }
}
