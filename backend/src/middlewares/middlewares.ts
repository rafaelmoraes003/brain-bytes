import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError';
import HTTPCodes from '../enum/HTTPCodes';
import AuthRequest from '../interfaces/AuthRequest';
import IUser from '../interfaces/IUser';

class Middlewares {

  public static errorHandler(
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    if (!err.statusCode) {
      err.statusCode = HTTPCodes.SERVER_ERROR;
    }

    const { message, statusCode } = err;

    res.status(statusCode).json({ error: message });
  };
}

export default Middlewares;
