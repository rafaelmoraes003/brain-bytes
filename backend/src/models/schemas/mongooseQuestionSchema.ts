import { Schema } from 'mongoose';
import IQuestion from '../../interfaces/IQuestion';

const mongooseQuestionSchema: Schema<IQuestion> = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  incorrectAnswers: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

export default mongooseQuestionSchema;
