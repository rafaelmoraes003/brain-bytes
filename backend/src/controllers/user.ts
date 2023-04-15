import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';
import IUser from '../interfaces/IUser';

class UserController {
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;

  }
}

export default UserController;
