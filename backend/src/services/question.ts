import { Model } from 'mongoose';
import IQuestion from '../interfaces/IQuestion';
import HTTPCodes from '../enum/HTTPCodes';
import ServiceResponse from '../interfaces/ServiceResponse';
import validateBody from '../utils/validateBody';
import questionSchema from '../validations/question';
import CustomError from '../utils/CustomError';
import QuestionDocument from '../interfaces/QuestionDocument';

class QuestionService {
  private _questionModel: Model<IQuestion>;

  constructor(questionModel: Model<IQuestion>) {
    this._questionModel = questionModel;
  }

}

export default QuestionService;
