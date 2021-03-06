import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PushTokenAssociation } from './entities/push-token-association';
import { Document, Model } from 'mongoose';

type PushTokenAssociationDocument = PushTokenAssociation & Document;

@Injectable()
export class PushTokensDao {
  constructor(
    @InjectModel(PushTokenAssociation.name)
    private readonly pushTokenAssociationModel: Model<PushTokenAssociationDocument>,
  ) {}

  async get(email: string): Promise<string | null> {
    const associationDocument = await this.pushTokenAssociationModel
      .findOne({ email })
      .exec();

    return associationDocument && associationDocument.token;
  }

  async upsert(email: string, token: string): Promise<void> {
    await this.pushTokenAssociationModel
      .findOneAndUpdate(
        { email },
        { email, token },
        { upsert: true, new: true },
      )
      .exec();
  }
}
