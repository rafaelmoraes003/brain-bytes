import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import HTTPCodes from './enum/HTTPCodes';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
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

}

export const { app } = new App();
export { App };
