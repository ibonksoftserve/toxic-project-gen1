import { Router } from 'express';
import user from './user/user.routes';

export const routes = (): Router => {
  const app = Router();

  user(app);

  return app;
};