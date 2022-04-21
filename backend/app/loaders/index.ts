import { initMongo } from './mongo';
import { initExpress } from './express';
import { Express } from 'express';
import { configs } from '../config';

const init = async (app: Express) => {
  await initMongo(configs.databaseURL);

  await initExpress(app);
}

export default { init };