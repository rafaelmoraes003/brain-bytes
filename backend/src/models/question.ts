import { Model, model } from 'mongoose';
import IQuestion from '../interfaces/IQuestion';
import mongooseQuestionSchema from './schemas/mongooseQuestionSchema';

const Question: Model<IQuestion> = model('questions', mongooseQuestionSchema);

export default Question;
