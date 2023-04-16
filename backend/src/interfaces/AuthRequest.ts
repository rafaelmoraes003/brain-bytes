import { Request } from 'express';

interface AuthRequest extends Request {
  _id?: string,
}

export default AuthRequest;
