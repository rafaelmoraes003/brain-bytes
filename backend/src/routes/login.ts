import LoginController from '../controllers/login';
import LoginService from '../services/login';
import User from '../models/user';
import Route from './route';

class LoginRoute extends Route {
  private _loginController: LoginController;

  constructor(loginController: LoginController) {
    super();
    this._loginController = loginController;
    this.setRoutes();
  }

  public setRoutes(): void {
    this.routes.post('/', this._loginController.login);
  }
}

const loginService: LoginService = new LoginService(User);
const loginController: LoginController = new LoginController(loginService);
const loginRoute: LoginRoute = new LoginRoute(loginController);

export default loginRoute;
