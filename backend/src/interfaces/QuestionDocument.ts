import { Document } from 'mongoose';
import IQuestion from './IQuestion';

interface QuestionDocument extends IQuestion, Document { }

export default QuestionDocument;
