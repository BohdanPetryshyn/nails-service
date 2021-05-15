import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/user';
import { Model, Document } from 'mongoose';
import { Client } from './entities/client';

export type ClientDocument = Client & Document;

@Injectable()
export class ClientsDao {
  constructor(
    @InjectModel(Role.MASTER)
    private readonly masterModel: Model<ClientDocument>,
  ) {}

  async makeClient(
    email: string,
    clientData: ClientData,
  ): Promise<Client | null> {
    const clientDocument = await this.masterModel
      .findOneAndUpdate(
        { ['loginData.email']: email },
        { role: Role.CLIENT, clientData },
        { new: true },
      )
      .exec();

    return clientDocument && new Client(clientDocument);
  }
}
