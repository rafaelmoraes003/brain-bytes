import { Model, model } from 'mongoose';
import mongooseUserSchema from './schemas/mongooseUserSchema';
import IUser from '../interfaces/IUser';

const User: Model<IUser> = model('users', mongooseUserSchema);

export default User;
