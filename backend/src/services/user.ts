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

}

export default UserService;
