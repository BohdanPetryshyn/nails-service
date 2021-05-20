import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/user';
import { Model, Document } from 'mongoose';
import { Client } from './entities/client';
import { ClientData } from './entities/client-data';

export type ClientDocument = Client & Document;

@Injectable()
export class ClientsDao {
  constructor(
    @InjectModel(Role.CLIENT)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async makeClient(
    email: string,
    clientData: ClientData,
  ): Promise<Client | null> {
    const clientDocument = await this.clientModel
      .findOneAndUpdate(
        { ['loginData.email']: email, role: null },
        { role: Role.CLIENT, clientData },
        { new: true },
      )
      .exec();

    return clientDocument && new Client(clientDocument);
  }
}
