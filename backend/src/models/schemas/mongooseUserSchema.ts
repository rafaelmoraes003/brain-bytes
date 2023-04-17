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
  bytes: {
    type: Number,
    required: true,
    default: 10,
  },
  availableCategories: {
    type: [String],
    required: true,
    default: ['node.js', 'react', 'python'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  versionKey: false,
});

export default mongooseUserSchema;
