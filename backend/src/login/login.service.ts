import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user';
import { Utils } from '../utils/utils';
import { userSchema } from '../validations/userSchema';
import { ServiceResponse } from '../interfaces/ServiceResponse';

@Injectable()
export class LoginService {
  private userModel: Model<UserDocument>;

  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    this.userModel = userModel;
  }

  public async login(loginBody: User): Promise<ServiceResponse<Types.ObjectId>> {
    Utils.validateBody(userSchema, loginBody);

    const { username, password } = loginBody;

    const user: UserDocument | null = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('user does not exist.');
    }

    const encryptedPassword: string = Utils.getHash(password);

    if (encryptedPassword !== user.password) {
      throw new UnauthorizedException('incorrect password.');
    }

    return { data: user._id };
  }
}
