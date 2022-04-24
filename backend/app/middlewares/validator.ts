import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { BadRequestError } from '../core/api.errors';


export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const { error } = schema.validate(req[source], { abortEarly: false });

    if (!error) return next();

    const { details } = error;

    next(new BadRequestError<Joi.ValidationErrorItem>(removeDoubleQuotes(details)));
  } catch (error) {
    next(error);
  }
};

// Joi validator wraps errored fields in double quotes, so in response
// we receive message like "/"id/" is invalid".
const removeDoubleQuotes = (errors: Joi.ValidationErrorItem[]) => {
  return errors.map(error => ({
    ...error,
    message: error.message.replace(/\"/g, '')
  }));
}
