import { Body, Controller } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from 'src/schemas/question';

@Controller('question')
export class QuestionController {
  private questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  public async create(@Body() question: Question) {
    const { data } = await this.questionService.create(question);
    return data;
  }
}
