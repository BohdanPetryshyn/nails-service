import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsDao } from './clients.dao';
import { Client } from './entities/client';
import { ClientData } from './entities/client-data';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsDao: ClientsDao) {}

  async getAll(): Promise<Client[]> {
    return this.clientsDao.getAll();
  }

  async search(query: string): Promise<Client[]> {
    return this.clientsDao.search(query);
  }

  async makeClient(email: string, clientData: ClientData): Promise<Client> {
    const client = this.clientsDao.makeClient(email, clientData);

    if (!client) {
      throw new NotFoundException(`User ${email} not found.`);
    }

    return client;
  }
}
