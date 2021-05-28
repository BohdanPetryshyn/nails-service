import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/user';
import { Master } from './entities/master';
import { Document, Model } from 'mongoose';
import { MasterData } from './entities/master-data';
import { WorkingHours } from './entities/working-hours';
import { ServiceType } from './entities/service-type';
import { City } from './entities/city';
import {
  MasterSearchResult,
  MasterSearchResultConstructorParams,
} from './entities/master-search-result';
import { masterSearchAggregation } from './queries/master-search.query';
import { MasterSearchQueryResult } from './entities/master-search-query-result';

export type MasterDocument = Master & Document;

@Injectable()
export class MastersDao {
  constructor(
    @InjectModel(Role.MASTER)
    private readonly masterModel: Model<MasterDocument>,
  ) {}

  async getByEmail(email: string): Promise<Master | null> {
    const masterDocument = await this.masterModel
      .findOne({
        ['loginData.email']: email,
      })
      .exec();

    return masterDocument && Master.fromPlain(masterDocument);
  }

  async search(
    from: Date,
    services: ServiceType[],
    city: City,
  ): Promise<MasterSearchResult[]> {
    const query = masterSearchAggregation(services, city);
    const masterSearchResultDocuments = (await this.masterModel.aggregate(
      query,
    )) as MasterSearchResultConstructorParams[];

    const masterSearchResults = masterSearchResultDocuments.map(
      MasterSearchQueryResult.fromPlain,
    );

    return masterSearchResults.filter((result) => result.isAvailable(from));
  }

  async makeMaster(
    email: string,
    masterData: MasterData,
  ): Promise<Master | null> {
    const masterDocument = await this.masterModel
      .findOneAndUpdate(
        { ['loginData.email']: email, role: null },
        { role: Role.MASTER, masterData },
        { new: true },
      )
      .exec();

    return masterDocument && Master.fromPlain(masterDocument);
  }

  async addWorkingHours(
    email: string,
    workingHours: WorkingHours,
  ): Promise<boolean> {
    const updateResult = await this.masterModel
      .updateOne(
        { ['loginData.email']: email },
        { $push: { ['masterData.workingHours']: workingHours } },
      )
      .exec();

    return updateResult.nModified === 1;
  }
}
