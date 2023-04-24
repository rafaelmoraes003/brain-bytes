import { Model, ObjectId } from 'mongoose';
import IUser from '../interfaces/IUser';
import validateBody from '../utils/validateBody';
import userSchema from '../validations/user';
import UserDocument from '../interfaces/UserDocument';
import HTTPCodes from '../enum/HTTPCodes';
import CustomError from '../utils/CustomError';
import getHash from '../utils/getHash';
import createJWT from '../utils/createJWT';
import ServiceResponse from '../interfaces/ServiceResponse';
import validateObjectId from '../utils/validateObjectId';
import availableExtraCategories from '../utils/availableExtraCategories';
import HandleBytesParams from '../interfaces/HandleBytesParams';

class UserService {
  private _userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this._userModel = userModel;
  }

  public async create(userBody: IUser): Promise<ServiceResponse<string>> {
    validateBody(userSchema, userBody);

    const { username, password } = userBody;

    const user: UserDocument | null = await this._userModel.findOne({ username });

    if (user) {
      throw new CustomError('user already exists.', HTTPCodes.BAD_REQUEST);
    }

    const excryptedPassword: string = getHash(password);

    const newUser: UserDocument = await this._userModel
      .create({ username, password: excryptedPassword });

    const token: string = createJWT(newUser);
    return { code: HTTPCodes.CREATED, data: token };
  }

  public async getById(_id: ObjectId): Promise<ServiceResponse<UserDocument>> {
    const user: UserDocument | null = await this._userModel.findOne({ _id });
    if (!user) {
      throw new CustomError('user not found.', HTTPCodes.NOT_FOUND);
    }
    return { code: HTTPCodes.OK, data: user };
  }

  public async deleteMe(_id: ObjectId): Promise<ServiceResponse> {
    validateObjectId(_id);
    await this.getById(_id);
    await this._userModel.deleteOne({ _id });
    return { code: HTTPCodes.SUCCESS_NO_CONTENT };
  }

  public async incrementBytes(_id: ObjectId, bytes: number): Promise<void> {
    await this._userModel.updateOne(
      { _id },
      { $inc: { bytes } },
    );
  }

  public async decrementBytes(_id: ObjectId, bytes: number): Promise<void> {
    const updatedUser = await this._userModel.updateOne(
      {
        _id,
        bytes: { $gte: bytes },
      },
      { $inc: { bytes: -bytes } },
    );

    if (!updatedUser.modifiedCount) {
      throw new CustomError('you do not have enough bytes.', HTTPCodes.BAD_REQUEST);
    }
  }

  public async handleBytes(
    _id: ObjectId,
    payload: HandleBytesParams,
  ): Promise<ServiceResponse> {
    const { operation, value } = payload;

    if (!['inc', 'dec'].includes(operation)) {
      throw new CustomError('unknown operation.', HTTPCodes.BAD_REQUEST);
    }

    if (operation === 'inc') {
      await this.incrementBytes(_id, value);
    } else {
      await this.decrementBytes(_id, value);
    }

    return { code: HTTPCodes.SUCCESS_NO_CONTENT };
  }

  public async addCategory(_id: ObjectId, category: string): Promise<ServiceResponse> {
    if (!availableExtraCategories.includes(category)) {
      throw new CustomError('category is not available.', HTTPCodes.BAD_REQUEST);
    }

    await this._userModel.updateOne(
      { _id },
      { $push: { availableCategories: category } },
    );

    return { code: HTTPCodes.SUCCESS_NO_CONTENT };
  }
}

export default UserService;
