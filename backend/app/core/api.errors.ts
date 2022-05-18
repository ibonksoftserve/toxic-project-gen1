import { Response } from 'express';
import { DefaultMessage, ErrorResponse, ErrorType } from './api.interface';
import {
  BadRequestErrorResponse,
  ForbiddenErrorResponse,
  NotFoundErrorResponse,
  ServerErrorResponse,
  UnauthorizedErrorResponse,
} from './api.response';

export abstract class ApiError extends Error {

  constructor(type: ErrorType, protected response: ErrorResponse) {
    super(type);
  }

  public static handleError(error: ApiError, res: Response): Response {
    switch (error.message) {
    case ErrorType.BAD_REQUEST:
      return new BadRequestErrorResponse(error.response).send(res);
    case ErrorType.FORBIDDEN:
      return new ForbiddenErrorResponse(error.response).send(res);
    case ErrorType.BAD_TOKEN:
    case ErrorType.TOKEN_EXPIRED:
    case ErrorType.UNAUTHORIZED:
      return new UnauthorizedErrorResponse(error.response).send(res);
    case ErrorType.NOT_FOUND:
      return new NotFoundErrorResponse(error.response).send(res);
    default:
      return new ServerErrorResponse(error.response).send(res);
    }
  }
}

export class BadTokenError extends ApiError {
  constructor(message: string = DefaultMessage.bad_token) {
    super(ErrorType.BAD_TOKEN, { errors: [{ resource: 'Token', message }] });
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message: string = DefaultMessage.token_expired) {
    super(ErrorType.TOKEN_EXPIRED, { errors: [{ resource: 'Token', message }] });
  }
}

export class AuthFailureError extends ApiError {
  constructor(resource: string, message: string = DefaultMessage.auth_failed) {
    super(ErrorType.UNAUTHORIZED, { errors: [{ resource, message }] });
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = DefaultMessage.forbidden) {
    super(ErrorType.FORBIDDEN, { errors: [{ resource: 'User', message }] });
  }
}

export class BadRequestError<T> extends ApiError {
  constructor(errors: T[]) {
    super(ErrorType.BAD_REQUEST, { errors });
  }
}

export class ServerError extends ApiError {
  constructor(error: unknown) {
    super(ErrorType.SERVER, { errors: [error] });
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string, message: string = DefaultMessage.resource_not_found) {
    super(ErrorType.NOT_FOUND, { errors: [{ resource, message }] });
  }
}

export class UsernameExistsError extends ApiError {
  constructor(resource: string, message: string = DefaultMessage.username_exists) {
    super(ErrorType.RESOURCE_EXISTS, { errors: [{ resource, message }] });
  }
}

export class EmailExistsError extends ApiError {
  constructor(resource: string, message: string = DefaultMessage.email_exists) {
    super(ErrorType.RESOURCE_EXISTS, { errors: [{ resource, message }] });
  }
}
