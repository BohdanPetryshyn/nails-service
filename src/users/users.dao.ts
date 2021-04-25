import { Role, User, UserDocument } from './entities/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PersonalData } from './entities/personal-data';

@Injectable()
export class UsersDao {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getOrCreate(personalData: PersonalData): Promise<User> {
    const newUser = User.fromPlain({
      personalData,
    });

    const userDocument = await this.userModel
      .findOneAndUpdate(
        { ['personalData.email']: personalData.email },
        { $setOnInsert: newUser },
        { new: true, upsert: true },
      )
      .exec();
    return User.fromPlain(userDocument);
  }

  async setRoleIfNotSet(userEmail: string, role: Role): Promise<User | null> {
    const userDocument = await this.userModel
      .findOneAndUpdate(
        { ['personalData.email']: userEmail, role: null },
        { role },
        { new: true },
      )
      .exec();

    return userDocument && User.fromPlain(userDocument);
  }
}
