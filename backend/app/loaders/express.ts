import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from '../modules';
import { configs } from '../config';

export const initExpress = async (app: Express): Promise<void> => {

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(configs.apiPrefix, routes());

}
