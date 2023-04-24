import { ObjectId } from "mongoose";

interface IUser {
  username: string,
  password: string,
  bytes?: number,
  availableCategories?: string[],
  isAdmin?: boolean,
}

export default IUser;
