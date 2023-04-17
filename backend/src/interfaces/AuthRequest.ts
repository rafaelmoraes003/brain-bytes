import { Request } from 'express';
import { ObjectId } from 'mongoose';

interface AuthRequest extends Request {
  _id?: ObjectId,
  isAdmin?: boolean
}

export default AuthRequest;
