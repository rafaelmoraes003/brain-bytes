import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserDocument from '../interfaces/UserDocument';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

const createJWT = (user: UserDocument): string => {
  const { _id } = user;
  const token: string = jwt.sign({ _id }, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

export default createJWT;
