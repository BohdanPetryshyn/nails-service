import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Master, MasterCore, MasterPopulated } from './entities/master';
import { Document, Model } from 'mongoose';
import { User } from './entities/user';

type MasterDocument = Master & Document;
type MasterPopulatedDocument = MasterDocument & MasterPopulated;

@Injectable()
export class MastersDao {
  constructor(
    @InjectModel(Master.name)
    private readonly masterModel: Model<MasterDocument>,
  ) {}

  async crete(master: MasterCore): Promise<Master> {
    const masterDocument = await this.masterModel.create(master);

    return MastersDao.toMaster(masterDocument);
  }

  async getAll(): Promise<Master[]> {
    const masterDocuments = await this.masterModel.find().exec();

    return masterDocuments.map(MastersDao.toMaster);
  }

  async getAllPopulated(): Promise<MasterPopulated[]> {
    const masterPopulatedDocuments = await this.masterModel
      .find()
      .populate('user')
      .exec();

    return masterPopulatedDocuments.map((document) =>
      MastersDao.toMasterPopulated(document as MasterPopulatedDocument),
    );
  }

  private static toMaster(masterDocument: MasterDocument): Master {
    return new Master(masterDocument);
  }

  private static toMasterPopulated(
    masterDocument: MasterPopulatedDocument,
  ): MasterPopulated {
    return new MasterPopulated({
      ...masterDocument,
      user: new User(masterDocument.user),
    });
  }
}
