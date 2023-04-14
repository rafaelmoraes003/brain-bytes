import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login';
import IUser from '../interfaces/IUser';

class LoginController {
  private _loginService: LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

}

export default LoginController;
