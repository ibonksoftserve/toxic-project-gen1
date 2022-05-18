import express from 'express';
import loaders from './app/loaders';
import { configs } from './app/config';
import logger from './app/core/logger';

const startServer = async (): Promise<void> => {
  const app = express();
  const PORT = configs.port;

  await loaders.init(app);

  app.listen(PORT, () => {
    logger.info(`|------ Server is listening on ${PORT} ------|`);
  });
};

startServer();
