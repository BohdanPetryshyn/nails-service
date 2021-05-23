import { Role, User } from './entities/user';
import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { LoginData } from './entities/login-data';
import { Client } from './entities/client';
import { Master } from './entities/master';
import { MasterDocument } from './masters.dao';
import { ClientDocument } from './clients.dao';

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

  async getLoginDataByEmail(email: string): Promise<LoginData | null> {
    const userDocument = await this.userModel
      .findOne({ ['loginData.email']: email }, { loginData: true })
      .exec();

    return userDocument && LoginData.fromPlain(userDocument.loginData);
  }

  private static createUser(userDocument: UserDocument): User {
    if (userDocument.role === Role.CLIENT) {
      return Client.fromPlain(userDocument as ClientDocument);
    }
    if (userDocument.role === Role.MASTER) {
      return Master.fromPlain(userDocument as MasterDocument);
    }
    return User.fromPlain(userDocument);
  }
}
