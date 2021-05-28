import { User } from './entities/user';
import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { LoginData } from './entities/login-data';
import { Client } from './entities/client';
import { Master } from './entities/master';
import { MasterDocument } from './masters.dao';
import { ClientDocument } from './clients.dao';
import { UserData } from './entities/user-data';

type StrictUserDocument = User & Document;

type UserDocument = StrictUserDocument | MasterDocument | ClientDocument;

@Injectable()
export class UsersDao {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getOrCreate(loginData: LoginData): Promise<User> {
    const userDocument = await this.userModel
      .findOneAndUpdate(
        { ['loginData.email']: loginData.email },
        { $setOnInsert: { loginData } },
        { new: true, upsert: true },
      )
      .exec();
    return UsersDao.createUser(userDocument);
  }

  async getByEmail(email: string): Promise<User | null> {
    const userDocument = await this.userModel
      .findOne({ ['loginData.email']: email })
      .exec();

    return userDocument && UsersDao.createUser(userDocument);
  }

  async getByEmails(emails: string[]): Promise<User[]> {
    const userDocuments = await this.userModel
      .find({
        ['loginData.email']: { $in: emails },
      })
      .exec();

    return userDocuments.map(UsersDao.createUser);
  }

  async getLoginDataByEmail(email: string): Promise<LoginData | null> {
    const userDocument = await this.userModel
      .findOne({ ['loginData.email']: email }, { loginData: true })
      .exec();

    return userDocument && LoginData.fromPlain(userDocument.loginData);
  }

  async getFullNameByEmails(emails: string[]): Promise<Map<string, string>> {
    const userDocuments = await this.userModel.find(
      { ['loginData.email']: { $in: emails } },
      {
        ['loginData.email']: true,
        ['clientData.firstName']: true,
        ['clientData.lastName']: true,
        ['masterData.firstName']: true,
        ['masterData.lastName']: true,
      },
    );

    return new Map(
      userDocuments.map((document) => [
        document.loginData.email,
        UsersDao.getFullName(document),
      ]),
    );
  }

  private static createUser(userDocument: UserDocument): User {
    if (Client.isClient(userDocument)) {
      return Client.fromPlain(userDocument);
    }
    if (Master.isMaster(userDocument)) {
      return Master.fromPlain(userDocument);
    }
    return User.fromPlain(userDocument);
  }

  private static getFullName(userDocument: UserDocument): string {
    if (Client.isClient(userDocument)) {
      return UserData.getFullName(userDocument.clientData);
    }
    if (Master.isMaster(userDocument)) {
      return UserData.getFullName(userDocument.masterData);
    }
    return UserData.getFullName(userDocument.loginData);
  }
}
