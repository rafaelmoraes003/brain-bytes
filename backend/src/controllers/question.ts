import { Response, NextFunction } from 'express';
import QuestionService from '../services/question';
import AuthRequest from '../interfaces/AuthRequest';
import IQuestion from '../interfaces/IQuestion';

class QuestionController {
  private _questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this._questionService = questionService;

  }

}

export default QuestionController;
