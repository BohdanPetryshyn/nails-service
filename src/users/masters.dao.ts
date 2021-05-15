import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/user';
import { Master } from './entities/master';
import { Model, Document } from 'mongoose';
import { MasterData } from './entities/master-data';

export type MasterDocument = Master & Document;

@Injectable()
export class MastersDao {
  constructor(
    @InjectModel(Role.MASTER)
    private readonly masterModel: Model<MasterDocument>,
  ) {}

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

    return masterDocument && new Master(masterDocument);
  }
}
