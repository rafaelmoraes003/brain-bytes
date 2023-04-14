import { Router } from 'express';
import ApplicationRoutes from '../interfaces/ApplicationRoutes';

abstract class Route implements ApplicationRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
  }

  abstract setRoutes(): void;
}

export default Route;
