import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login';
import IUser from '../interfaces/IUser';

class LoginController {
  private _loginService: LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;

    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, data } = await this._loginService.login(req.body as IUser);
      res.status(code).json({ token: data });
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default LoginController;
