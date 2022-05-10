import { Request, Response } from 'express';
import { ApiError, ServerError } from '../core/api.errors';

export const errorsHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof ApiError) {
    ApiError.handleError(err, res);
  } else {
    ApiError.handleError(new ServerError(err), res);
  }
};
