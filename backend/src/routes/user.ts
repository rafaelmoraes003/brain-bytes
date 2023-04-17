import UserController from '../controllers/user';
import Middlewares from '../middlewares/middlewares';
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

    this.routes.use(Middlewares.auth);

    this.routes.delete('/me', this._userController.deleteMe);

    this.routes.patch('/bytes/:operation/:value', this._userController.handleBytes);

  }
}

const userService: UserService = new UserService(User);
const userController: UserController = new UserController(userService);
const userRoute: UserRoute = new UserRoute(userController);

export default userRoute;
