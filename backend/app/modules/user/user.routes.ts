import { Router } from 'express';
import getController from './user.factory';
import validator, { ValidationSource } from '../../middlewares/validator';
import userSchema from './user.schema';
import asyncHandler from '../../middlewares/async-handler';

const route = Router();
const controller = getController();

export default (app: Router) => {
  app.use('/', route);

  route.get('/users',
    asyncHandler(async (req, res) => {
      return controller.getAllUsers(req, res);
    })
  );

  route.get('/user/:id',
    validator(userSchema.userId, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
      return controller.getUser(req, res);
    })
  );

  route.post('/user',
    validator(userSchema.userCreate, ValidationSource.BODY),
    asyncHandler(async (req, res) => {
      return controller.createUser(req, res);
    })
  );

  route.patch('/user/:id/',
    validator(userSchema.userId, ValidationSource.PARAM),
    validator(userSchema.userUpdate, ValidationSource.BODY),
    asyncHandler(async (req, res) => {
      return controller.updateUser(req, res);
    })
  );

  route.delete('/user/:id',
    validator(userSchema.userId, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
      return controller.deleteUser(req, res);
    })
  );

};