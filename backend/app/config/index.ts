import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('Couldn\'t find .env file');
}

export const configs = {
  port: process.env.PORT || 3001,
  databaseURL: process.env.MONGODB_URI || 'mongodb://mongo:27017/test_collection',
  apiPrefix: process.env.API_PREFIX || '/api'
  // ...jwtSecret: ...
  // ...jwtAlgorythm: ...
};