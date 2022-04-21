import { Router, Request, Response } from 'express';
import { getController } from './user.factory';
const route = Router();
const controller = getController();

export default (app: Router) => {
  app.use('/', route);

  route.get('/users', (req: Request, res: Response) => {
    return controller.getAllUsers(req, res);
  });

  route.get('/user/:id', (req: Request, res: Response) => {
    return controller.getUser(req, res);
  });

  route.post('/user', (req: Request, res: Response) => {
    return controller.createUser(req, res);
  });

  route.patch('/user/:id', (req: Request, res: Response) => {
    return controller.updateUser(req, res);
  });

  route.delete('/user/:id', (req: Request, res: Response) => {
    return controller.deleteUser(req, res);
  });

};