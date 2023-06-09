import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Categories } from '../types/Categories';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import { User, UserDocument } from '../schemas/user';
import { Utils } from '../utils/utils';
import { userSchema } from '../validations/userSchema';

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

  public async getById(_id: Types.ObjectId): Promise<ServiceResponse<UserDocument>> {
    Utils.validateObjectId(_id);

    const user: UserDocument | null = await this.userModel.findById(_id, { _id: 0 });

    if (!user) {
      throw new NotFoundException('user not found.');
    }

    return { data: user };
  }

  public async delete(_id: Types.ObjectId): Promise<void> {
    await this.getById(_id);
    await this.userModel.deleteOne({ _id });
  }

  public async addCategory(
    _id: Types.ObjectId,
    category: Categories,
  ): Promise<void> {
    Utils.validateObjectId(_id);
    Utils.validateCategory(category);
    await this.getById(_id);

    await this.userModel.updateOne(
      { _id },
      { $addToSet: { availableCategories: category } },
    );
  }

  public async handleBytes(
    _id: Types.ObjectId,
    operation: string,
    bytes: number,
  ): Promise<void> {
    Utils.validateOperation(operation);
    await this.getById(_id);

    if (operation === 'inc') {
      await this.incrementeBytes(_id, bytes);
    } else {
      await this.decrementeBytes(_id, bytes);
    }
  }

  private async incrementeBytes(_id: Types.ObjectId, bytes: number): Promise<void> {
    await this.userModel.updateOne(
      { _id },
      { $inc: { bytes } },
    );
  }

  private async decrementeBytes(_id: Types.ObjectId, bytes: number): Promise<void> {
    const { modifiedCount } = await this.userModel.updateOne(
      { _id, bytes: { $gte: bytes } },
      { $inc: { bytes: -bytes } },
    );

    if (!modifiedCount) {
      throw new ForbiddenException('you do not have enough bytes.');
    }
  }
}
