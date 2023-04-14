import { Model } from 'mongoose';
import IUser from '../interfaces/IUser';
import validateBody from '../utils/validateBody';
import userSchema from '../validations/user';
import CustomError from '../utils/CustomError';
import HTTPCodes from '../enum/HTTPCodes';
import getHash from '../utils/getHash';
import createJWT from '../utils/createJWT';
import UserDocument from '../interfaces/UserDocument';
import ServiceResponse from '../interfaces/ServiceResponse';

class LoginService {
  private _userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this._userModel = userModel;
  }

  public async login(userLoginBody: IUser): Promise<ServiceResponse<string>> {
    validateBody(userSchema, userLoginBody);

    const { username, password } = userLoginBody;

    const user: UserDocument | null = await this._userModel.findOne({ username });

    if (!user) {
      throw new CustomError('user not found.', HTTPCodes.NOT_FOUND);
    }

    const encryptedPassword: string = getHash(password);

    if (encryptedPassword !== user.password) {
      throw new CustomError('incorrect password', HTTPCodes.UNAUTHORIZED);
    }

    const token: string = createJWT(user);

    return { code: HTTPCodes.OK, data: token };
  }
}

export default LoginService;
