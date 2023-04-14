import { Document } from 'mongoose';
import IUser from './IUser';

interface UserDocument extends IUser, Document { }

export default UserDocument;
