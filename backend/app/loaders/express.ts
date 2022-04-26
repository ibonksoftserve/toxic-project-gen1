import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from '../modules';
import { configs } from '../config';
import { requestLogger } from '../middlewares/request-logger';
import { errorsHandler } from '../middlewares/errors-handler';

export const initExpress = async (app: Express): Promise<void> => {

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(requestLogger);

  app.use(configs.apiPrefix, routes());

  app.use(errorsHandler);
}
