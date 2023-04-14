import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

const createJWT = (user: IUser): string => {
  const token: string = jwt.sign(user, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

export default createJWT;
