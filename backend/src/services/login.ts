import { Model } from 'mongoose';
import IUser from '../interfaces/IUser';

class LoginService {
  private _userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this._userModel = userModel;
  }

}

export default LoginService;
