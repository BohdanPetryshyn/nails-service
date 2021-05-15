import { Role, User, UserDocument } from './entities/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PersonalData } from './entities/personal-data';
import { Client } from './entities/client';
import { Master } from './entities/master';

@Injectable()
export class UsersDao {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getOrCreate(personalData: PersonalData): Promise<User> {
    const userDocument = await this.userModel
      .findOneAndUpdate(
        { ['personalData.email']: personalData.email },
        { $setOnInsert: { personalData } },
        { new: true, upsert: true },
      )
      .exec();
    return UsersDao.createUser(userDocument);
  }

  async setRoleIfNotSet(userEmail: string, role: Role): Promise<User | null> {
    const userDocument = await this.userModel
      .findOneAndUpdate(
        { ['personalData.email']: userEmail, role: null },
        { role },
        { new: true },
      )
      .exec();

    return userDocument && UsersDao.createUser(userDocument);
  }

  private static createUser(userDocument: UserDocument): User {
    if (userDocument.role === Role.CLIENT) {
      return new Client(userDocument);
    }
    if (userDocument.role === Role.MASTER) {
      return new Master(userDocument);
    }
    return new User(userDocument);
  }
}
