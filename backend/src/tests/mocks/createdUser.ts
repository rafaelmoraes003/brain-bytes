import { Types } from 'mongoose';
import User from '../../models/user';
import MockCreatedUser from '../../interfaces/MockCreatedUser';

const mockUsers: MockCreatedUser[] = [
  {
    _id: new Types.ObjectId(),
    username: 'yoshi',
    password: '827ccb0eea8a706c4c34a16891f84e7b',
    bytes: 10,
    availableCategories: ['node.js', 'react', 'python'],
    isAdmin: false,
  },
];

const createdUsers = mockUsers.map((user) => new User(user));

export default createdUsers;
