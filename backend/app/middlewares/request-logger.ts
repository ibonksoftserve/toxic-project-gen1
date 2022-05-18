import { NextFunction, Request, Response } from 'express';
import onFinished from 'on-finished';
import logger from '../core/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date().getMilliseconds();
  let line = `| ${req.ip} - "${req.method} ${req.path}" |`;

  onFinished(res, () => {
    line += `| ${new Date().getMilliseconds() - startTime} ms |`;
    line += `| Status Code ${res.statusCode} |`;

    logger.info(line);
  });

  next();
};