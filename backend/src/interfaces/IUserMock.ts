import mongoose from 'mongoose';

interface IUserMock {
  _id: mongoose.Types.ObjectId,
  username: string,
  password: string,
}

export default IUserMock;
