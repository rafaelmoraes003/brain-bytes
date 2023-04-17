import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import HTTPCodes from './enum/HTTPCodes';
import loginRoute from './routes/login';
import userRoute from './routes/user';
import questionRoute from './routes/question';
import connectToDatabase from './models/connection';
import Middlewares from './middlewares/middlewares';

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
  }

  private setApplicationRoutes(): void {
    this.app.get('/ping', (_req: Request, res: Response): void => {
      res.status(HTTPCodes.OK).json({ pong: true });
    });

    this.app.use('/login', loginRoute.routes);
    this.app.use('/user', userRoute.routes);
    this.app.use('/questions', questionRoute.routes);
  }

  private setErrorMiddleware(): void {
    this.app.use(Middlewares.errorHandler);
  }

  public async start(PORT: number): Promise<void> {
    try {
      await connectToDatabase();
      this.app.listen(PORT, (): void => console.log(`Running at port ${PORT}`));
    } catch (err: unknown) {
      const error = err as Error;
      console.log('Connection with database generated an error:\r\n');
      console.error(error.message);
      console.log('\r\nServer initialization cancelled');
      process.exit(0);
    }
  }
}

export const { app } = new App();
export { App };
