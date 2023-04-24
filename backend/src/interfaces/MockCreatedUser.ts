import { Types } from 'mongoose';

interface MockCreatedUser {
  _id: Types.ObjectId,
  username: string,
  password: string,
  bytes: number,
  availableCategories: string[],
  isAdmin: boolean,
}

export default MockCreatedUser;
