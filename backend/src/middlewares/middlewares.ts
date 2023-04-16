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
  }

  public static auth(req: AuthRequest, res: Response, next: NextFunction): void {
    const { authorization: token } = req.headers;
    const JWT_SECRET: string = process.env.JWT_SECRET as string;

    if (!token) {
      throw new CustomError('token not found.', HTTPCodes.NOT_FOUND);
    }

    try {
      const { _id } = jwt.verify(token, JWT_SECRET) as IUser;
      req._id = _id;
      next();
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default Middlewares;
