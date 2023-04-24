import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import UserService from '../services/user';
import IUser from '../interfaces/IUser';
import AuthRequest from '../interfaces/AuthRequest';
import HandleBytesParams from '../interfaces/HandleBytesParams';

class UserController {
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.deleteMe = this.deleteMe.bind(this);
    this.handleBytes = this.handleBytes.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, data } = await this._userService.create(req.body as IUser);
      res.status(code).json({ token: data });
    } catch (error: unknown) {
      next(error);
    }
  }

  public async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, data } = await this._userService
        .getById(req._id as ObjectId);
      res.status(code).json(data);
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

  public async handleBytes(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = await this._userService
        .handleBytes(req._id as ObjectId, req.body as HandleBytesParams);
      res.status(code).end();
    } catch (error: unknown) {
      next(error);
    }
  }

  public async addCategory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = await this._userService
        .addCategory(req._id as ObjectId, req.body.category as string);
      res.status(code).end();
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default UserController;
