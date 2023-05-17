import { Body, Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { Question } from '../schemas/question';
import { Categories } from '../types/Categories';
import { QuestionService } from './question.service';

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

  @Get(':category')
  @HttpCode(HttpStatus.OK)
  public async getFiveQuestionsFromCategory(@Param('category') category: Categories) {
    const { data } = await this.questionService.getFiveQuestionsFromCategory(category);
    return data;
  }
}
