import QuestionController from '../controllers/question';
import Middlewares from '../middlewares/middlewares';
import Question from '../models/question';
import QuestionService from '../services/question';
import Route from './route';

class QuestionRoute extends Route {
  private _questionController: QuestionController;

  constructor(questionController: QuestionController) {
    super();
    this._questionController = questionController;

  }

}
