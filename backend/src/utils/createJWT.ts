import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import 'dotenv/config';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

const createJWT = (user: IUser): string => {
  const { username, password } = user;
  const token: string = jwt.sign({ username, password }, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

export default createJWT;
