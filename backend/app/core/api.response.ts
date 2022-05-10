import { Response } from "express";
import { ErrorResponse, StatusCode } from "./api.interface";

abstract class ApiResponse<T> {
  constructor(protected statusCode: number, protected data: T) { }

  public send(res: Response): Response {
    return res.status(this.statusCode).send(this.data);
  }
}

export class SuccessResponse<T> extends ApiResponse<T> {
  constructor(protected data: T) {
    super(StatusCode.OK, data);
  }
}

export class BadRequestErrorResponse extends ApiResponse<ErrorResponse> {
  constructor(protected data: ErrorResponse) {
    super(StatusCode.BAD_REQUEST, data);
  }
}

export class UnauthorizedErrorResponse extends ApiResponse<ErrorResponse> {
  constructor(protected data: ErrorResponse) {
    super(StatusCode.UNAUTHORIZED, data);
  }
}

export class ForbiddenErrorResponse extends ApiResponse<ErrorResponse> {
  constructor(protected data: ErrorResponse) {
    super(StatusCode.FORBIDDEN, data);
  }
}

export class NotFoundErrorResponse extends ApiResponse<ErrorResponse> {
  constructor(protected data: ErrorResponse) {
    super(StatusCode.NOT_FOUND, data);
  }
}

export class ServerErrorResponse extends ApiResponse<ErrorResponse> {
  constructor(protected data: ErrorResponse) {
    super(StatusCode.SERVER, data);
  }
}

export class UserExistsErrorResponse extends ApiResponse<ErrorResponse> {
  constructor(protected data: ErrorResponse) {
    super(StatusCode.USER_EXISTS, data);
  }
}
