import mongoose from 'mongoose';
import logger from '../core/logger';

export const initMongo = async (url: string): Promise<void> => {
  await mongoose.connect(url, { autoIndex: false })
    .then(() => {
      logger.info('connection successfully established');
    })
    .catch((error) => {
      logger.error(error);
    });
};
