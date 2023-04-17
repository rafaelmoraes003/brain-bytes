import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import UserService from '../services/user';
import IUser from '../interfaces/IUser';
import AuthRequest from '../interfaces/AuthRequest';

class UserController {
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;

    this.create = this.create.bind(this);
    this.deleteMe = this.deleteMe.bind(this);
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, data } = await this._userService.create(req.body as IUser);
      res.status(code).json({ token: data });
    } catch (error: unknown) {
      next(error);
    }
  }

  public async deleteMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = await this._userService
        .deleteMe(req._id as ObjectId);
      res.status(code).end();
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default UserController;
