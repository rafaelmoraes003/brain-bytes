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

    this.setRoutes();
  }

  public setRoutes(): void {
    this.routes.use(Middlewares.auth);

    this.routes.get('/', this._questionController.getAll);
  }
}

const questionService: QuestionService = new QuestionService(Question);
const questionController: QuestionController = new QuestionController(questionService);
const questionRoute: QuestionRoute = new QuestionRoute(questionController);

export default questionRoute;
