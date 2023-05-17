import { Controller } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  private questionService: QuestionService

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }
}
