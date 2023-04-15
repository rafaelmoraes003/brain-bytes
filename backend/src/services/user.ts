import { Model } from 'mongoose';
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
      throw new CustomError('user already exists', HTTPCodes.BAD_REQUEST);
    }

    const excryptedPassword: string = getHash(password);

    const newUser: UserDocument = await this._userModel
      .create({ username, password: excryptedPassword, coins: 10 });

    const token: string = createJWT(newUser);
    return { code: HTTPCodes.CREATED, data: token };
  }

  public async getById(_id: string): Promise<ServiceResponse<UserDocument>> {
    const user: UserDocument | null = await this._userModel.findOne({ _id });
    if (!user) {
      throw new CustomError('user not found.', HTTPCodes.NOT_FOUND);
    }
    return { code: HTTPCodes.OK, data: user };
  }

  public async delete(_id: string): Promise<ServiceResponse> {
    validateObjectId(_id);
    await this.getById(_id);
    await this._userModel.deleteOne({ _id });
    return { code: HTTPCodes.SUCCESS_NO_CONTENT };
  }
}

export default UserService;
