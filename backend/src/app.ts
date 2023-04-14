import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import HTTPCodes from './enum/HTTPCodes';
import errorHandler from './middlewares/erroHandler';
import loginRoute from './routes/login';

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

    this.app.use('/login', loginRoute.routes);
  }

  private setErrorMiddleware(): void {
    this.app.use(errorHandler);
  }

  public async start(PORT: number): Promise<void> {
    this.app.listen(PORT, (): void => console.log(`Running at port ${PORT}`));
  }

}

export const { app } = new App();
export { App };
