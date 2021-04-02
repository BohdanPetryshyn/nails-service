import { User, UserDocument } from './entities/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersDao {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getOrCreate(email: string, user: User): Promise<User> {
    const userDocument = await this.userModel
      .findOneAndUpdate(
        { ['personalData.email']: email },
        { $setOnInsert: user },
        { new: true, upsert: true },
      )
      .exec();
    return User.fromPlain(userDocument);
  }
}
