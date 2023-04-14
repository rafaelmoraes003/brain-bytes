import express, { Express } from 'express';
import cors from 'cors';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

}

export const { app } = new App();
export { App };
