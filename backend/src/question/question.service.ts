import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/question';

@Injectable()
export class QuestionService {
  private questionModel: Model<QuestionDocument>;

  constructor(@InjectModel(Question.name) questionModel: Model<QuestionDocument>) {
    this.questionModel = questionModel;
  }
}
