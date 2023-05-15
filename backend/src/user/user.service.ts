import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';
import { User, UserDocument } from 'src/schemas/user';
import { Utils } from 'src/utils/utils';
import { userSchema } from 'src/validations/userSchema';

@Injectable()
export class UserService {
  private userModel: Model<UserDocument>;

  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    this.userModel = userModel;
  }

  public async create(userToCreate: User): Promise<ServiceResponse<UserDocument>> {
    Utils.validateBody(userSchema, userToCreate);

    const { username, password } = userToCreate;

    const user: UserDocument | null = await this.userModel.findOne({ username });

    if (user) {
      throw new ConflictException('user already exists.');
    }

    const encryptedPassword = Utils.getHash(password);

    const newUser: UserDocument = await this.userModel
      .create({ username, password: encryptedPassword });

    return { data: newUser };
  }
}
