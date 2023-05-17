import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/question';
import { Utils } from '../utils/utils';
import { questionSchema } from '../validations/questionSchema';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import { Categories } from '../types/Categories';

@Injectable()
export class QuestionService {
  private questionModel: Model<QuestionDocument>;

  constructor(@InjectModel(Question.name) questionModel: Model<QuestionDocument>) {
    this.questionModel = questionModel;
  }

  public async create(question: Question): Promise<ServiceResponse<QuestionDocument>> {
    Utils.validateBody(questionSchema, question);
    const newQuestion: QuestionDocument = await this.questionModel.create(question);
    return { data: newQuestion };
  }

  public async getFiveQuestionsFromCategory(
    category: Categories,
  ): Promise<ServiceResponse<QuestionDocument[]>> {
    Utils.validateCategory(category);
    const questions: QuestionDocument[] = await this.questionModel.aggregate([
      { $match: { category } },
      { $sample: { size: 5 } },
    ]);
    return { data: questions };
  }
}
