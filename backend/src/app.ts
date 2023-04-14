import express, { Express } from 'express';

class App {
  public app: Express;

  constructor() {
    this.app = express();
  }

}

export const { app } = new App();
export { App };
