import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';
import IUser from '../interfaces/IUser';
import AuthRequest from '../interfaces/AuthRequest';

class UserController {
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;

    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, data } = await this._userService.create(req.body as IUser);
      res.status(code).json({ token: data });
    } catch (error: unknown) {
      next(error);
    }
  }

  public async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { _id } = req.params;
      const { code } = await this._userService.delete(_id, req._id as string);
      res.status(code).end();
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default UserController;
