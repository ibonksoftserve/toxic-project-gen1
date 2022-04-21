import express from 'express';
import loaders from './app/loaders';
import { configs } from './app/config';

const startServer = async (): Promise<void> => {
  const app = express();
  const PORT = configs.port;

  await loaders.init(app);

  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
}

startServer();
