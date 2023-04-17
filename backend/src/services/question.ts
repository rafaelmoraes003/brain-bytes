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

  public async getAll(): Promise<ServiceResponse<QuestionDocument[]>> {
    const questions: QuestionDocument[] = await this._questionModel.find();
    return { code: HTTPCodes.OK, data: questions };
  }

  public async getByCategory(category: string): Promise<ServiceResponse<QuestionDocument[]>> {
    const questionsByCategory: QuestionDocument[] = await this._questionModel.aggregate([
      { $match: { category } },
      { $sample: { size: 5 } },
    ]);

    return { code: HTTPCodes.OK, data: questionsByCategory };
  }
}

export default QuestionService;
