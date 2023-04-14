import LoginController from '../controllers/login';
import LoginService from '../services/login';
import User from '../models/user';
import Route from './route';

class LoginRoute extends Route {
  private _loginController: LoginController;

  constructor(loginController: LoginController) {
    super();
    this._loginController = loginController;
  }
}
