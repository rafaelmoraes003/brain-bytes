import UserController from '../controllers/user';
import User from '../models/user';
import UserService from '../services/user';
import Route from './route';

class UserRoute extends Route {
  private _userController: UserController;

  constructor(userController: UserController) {
    super();
    this._userController = userController;

    this.setRoutes();
  }

  public setRoutes(): void {
    this.routes.post('/', this._userController.create);
  }
}

const userService: UserService = new UserService(User);
const userController: UserController = new UserController(userService);
const userRoute: UserRoute = new UserRoute(userController);

export default userRoute;
