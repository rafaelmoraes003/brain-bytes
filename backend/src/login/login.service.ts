import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user';

@Injectable()
export class LoginService {
  private userModel: Model<UserDocument>;

  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    this.userModel = userModel;
  }
}
