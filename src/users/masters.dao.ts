import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/user';
import { Master, MasterDocument } from './entities/master';
import { Model } from 'mongoose';
import { MasterPersonalData } from './entities/master-personal-data';

@Injectable()
export class MastersDao {
  constructor(
    @InjectModel(Role.MASTER)
    private readonly masterModel: Model<MasterDocument>,
  ) {}

  async update(personalData: MasterPersonalData): Promise<Master | null> {
    const updatedMaster = await this.masterModel.findOneAndUpdate(
      { ['personalData.email']: personalData.email },
      { personalData },
      { new: true },
    );

    return (
      updatedMaster &&
      new Master({
        personalData: new MasterPersonalData(updatedMaster.personalData),
      })
    );
  }
}
