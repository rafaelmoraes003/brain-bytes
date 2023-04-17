import { Response, NextFunction } from 'express';
import QuestionService from '../services/question';
import AuthRequest from '../interfaces/AuthRequest';
import IQuestion from '../interfaces/IQuestion';

class QuestionController {
  private _questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this._questionService = questionService;

  }

  public async getAll(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { code, data } = await this._questionService.getAll();
      res.status(code).json(data);
    } catch (error: unknown) {
      next(error);
    }
  }

  public async getByCategory(req: AuthRequest, res: Response, next: NextFunction) {
    const { category } = req.params;
    try {
      const { code, data } = await this
        ._questionService.getByCategory(category as string);
      res.status(code).json(data);
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default QuestionController;
