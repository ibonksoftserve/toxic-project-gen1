import Joi from 'joi';

// <------- Common ------->
export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  RESOURCE_EXISTS = 409,
  SERVER = 500,
}

// <------- Errors ------->
export enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  SERVER = 'ServerError',
  NOT_FOUND = 'NotFoundError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
  RESOURCE_EXISTS = 'ResourceExistsError',
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
  auth_failed = 'Invalid Credentials',
  username_exists = 'User with the same name exists',
  email_exists = 'User with the same email exists',
}

export interface ErrorResponse {
  errors: Array<unknown | Joi.ValidationErrorItem | CustomError>;
  statusCode?: number; // I've added this as an example how to expand error response with some custom metadata
}
