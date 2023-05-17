import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/question';
import { Utils } from 'src/utils/utils';
import { questionSchema } from 'src/validations/questionSchema';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';

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
}
