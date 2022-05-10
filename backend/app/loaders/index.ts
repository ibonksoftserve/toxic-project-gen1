import { initMongo } from './mongo';
import { initExpress } from './express';
import { Express } from 'express';
import { configs } from '../config';
import { createLogsDir } from '../core/logger';

const init = async (app: Express) => {
  await initMongo(configs.databaseURL);

  await initExpress(app);

  createLogsDir();
};

export default { init };