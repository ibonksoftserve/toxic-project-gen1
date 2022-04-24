import Joi from 'joi';

// <------- Common ------->
export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER = 500,
}

// <------- Errors ------->
export enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  SERVER = 'ServerlError',
  NOT_FOUND = 'NotFoundError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export interface CustomError {
  resource: string;
  message: string;
}

export enum DefaultMessage {
  resource_not_found = 'The specified resource does not exist.',
  bad_token = 'Token is not valid',
  token_expired = 'Token is expired',
  forbidden = 'Permission denied',
  auth_failed = 'Invalid Credentials'
}

export interface ErrorResponse {
  errors: Array<unknown | Joi.ValidationErrorItem | CustomError>;
  statusCode?: number; // I've added this as an example how to expand error responce with some custom metadata
}
