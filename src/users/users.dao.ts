import { Role, User, UserCore } from './entities/user';
import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersDao {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User & Document>,
  ) {}

  async getOrCreate(user: UserCore): Promise<User> {
    const userDocument = await this.userModel
      .findOneAndUpdate(
        { email: user.email },
        { $setOnInsert: user },
        { new: true, upsert: true },
      )
      .exec();

    return new User(userDocument);
  }

  async setRoleIfNotSet(userId: string, role: Role): Promise<User | null> {
    const userDocument = await this.userModel
      .findOneAndUpdate({ id: userId, role: null }, { role }, { new: true })
      .exec();

    return userDocument && new User(userDocument);
  }
}
