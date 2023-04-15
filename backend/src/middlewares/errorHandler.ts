import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';
import HTTPCodes from '../enum/HTTPCodes';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (!err.statusCode) {
    err.statusCode = HTTPCodes.SERVER_ERROR;
  }

  const { message, statusCode } = err;

  res.status(statusCode).json({ error: message });
};

export default errorHandler;
