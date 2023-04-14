import { Schema } from 'mongoose';
import IUser from '../../interfaces/IUser';

const mongooseUserSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
  },
}, {
  versionKey: false,
});

export default mongooseUserSchema;
