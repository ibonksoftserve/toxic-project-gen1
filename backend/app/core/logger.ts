import path from 'path';
import fs from 'fs';
import { createLogger, transports, format } from 'winston';
import { configs } from '../config';
const { timestamp, combine, printf, colorize, errors, prettyPrint } = format;
const TIMESTAMP_FORMAT = 'YYYY-MM-DD hh:mm:ss';

const getDirname = () => {
  return path.resolve(configs.logDir);
};

export const createLogsDir = () => {
  const dir = getDirname();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const logLevel = configs.env === 'development' ? 'debug' : 'warn';

const formatSplat = (splat: string) => {
  if (splat && splat.length) {
    return splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
  }

  return '';
};

const customFormat = printf(({
  timestamp,
  level,
  message,
  stack,
  ...meta
}) => {
  // some kind of hack to get additional parameters and print them in the line
  const splatSymbol: string = Symbol.for('splat') as unknown as string;
  const splat = formatSplat(meta[splatSymbol]);

  let line = `[${timestamp}] ${level}: ${message}`;

  if (splat) { line += ` ${splat} `; }
  if (stack) { line += ` ${stack} `; }

  return line;
});

const getLogger = () => {

  const logger = createLogger({
    level: logLevel,
    format: errors({ stack: true }),
    transports: [
      new transports.File({
        filename: `${getDirname()}/errors.log`, level: 'error', format: combine(
          timestamp({ format: TIMESTAMP_FORMAT }),
          prettyPrint()
        ),
      }),
    ],
    exitOnError: false,
  });

  if (configs.env !== 'production') {
    logger.add(new transports.Console({
      format: combine(
        colorize({ message: true, level: true }),
        timestamp({ format: TIMESTAMP_FORMAT }),
        customFormat
      ),
    }));
  }

  return logger;
};

export default getLogger();

