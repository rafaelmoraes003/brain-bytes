import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import HTTPCodes from './enum/HTTPCodes';
import errorHandler from './middlewares/erroHandler';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.setApplicationRoutes();
    this.setErrorMiddleware();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.setApplicationRoutes();
  }

  private setApplicationRoutes(): void {
    this.app.get('/ping', (_req: Request, res: Response): void => {
      res.status(HTTPCodes.OK).json({ pong: true });
    });
  }

  private setErrorMiddleware(): void {
    this.app.use(errorHandler);
  }

}

export const { app } = new App();
export { App };
