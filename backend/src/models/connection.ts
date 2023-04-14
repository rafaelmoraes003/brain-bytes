import mongoose from 'mongoose';
import 'dotenv/config';

const databaseURI: string = process.env.MONGODB_URI as string;

const connectToDatabase = async (uri: string = databaseURI): Promise<void> => {
  await mongoose.connect(uri);
  console.log('Connected to database!');
};

export default connectToDatabase;
