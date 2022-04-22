import mongoose from 'mongoose';

export const initMongo = async (url: string): Promise<void> => {
  await mongoose.connect(url, { autoIndex: false })
    .then(() => {
      console.info('connection successfully established');
    })
    .catch((error) => {
      console.error(error);
    });
}
