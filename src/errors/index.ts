export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TENANT_NOT_FOUND = 'TENANT_NOT_FOUND',
  TENANT_SUSPENDED = 'TENANT_SUSPENDED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_INACTIVE = 'USER_INACTIVE',
  BRANCH_NOT_FOUND = 'BRANCH_NOT_FOUND',
  BRANCH_INACTIVE = 'BRANCH_INACTIVE',
  SERVICE_NOT_FOUND = 'SERVICE_NOT_FOUND',
  SERVICE_INACTIVE = 'SERVICE_INACTIVE',
  QUEUE_NOT_FOUND = 'QUEUE_NOT_FOUND',
  QUEUE_CLOSED = 'QUEUE_CLOSED',
  QUEUE_AT_CAPACITY = 'QUEUE_AT_CAPACITY',
  TICKET_NOT_FOUND = 'TICKET_NOT_FOUND',
  TICKET_INVALID_TRANSITION = 'TICKET_INVALID_TRANSITION',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  CONFLICT = 'CONFLICT',
}

export const ERROR_HTTP_STATUS: Record<ErrorCode, number> = {
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.INVALID_CREDENTIALS]: 401,
  [ErrorCode.TOKEN_EXPIRED]: 401,
  [ErrorCode.TOKEN_INVALID]: 401,
  [ErrorCode.TENANT_NOT_FOUND]: 404,
  [ErrorCode.TENANT_SUSPENDED]: 403,
  [ErrorCode.USER_NOT_FOUND]: 404,
  [ErrorCode.USER_ALREADY_EXISTS]: 409,
  [ErrorCode.USER_INACTIVE]: 403,
  [ErrorCode.BRANCH_NOT_FOUND]: 404,
  [ErrorCode.BRANCH_INACTIVE]: 400,
  [ErrorCode.SERVICE_NOT_FOUND]: 404,
  [ErrorCode.SERVICE_INACTIVE]: 400,
  [ErrorCode.QUEUE_NOT_FOUND]: 404,
  [ErrorCode.QUEUE_CLOSED]: 400,
  [ErrorCode.QUEUE_AT_CAPACITY]: 400,
  [ErrorCode.TICKET_NOT_FOUND]: 404,
  [ErrorCode.TICKET_INVALID_TRANSITION]: 400,
  [ErrorCode.VALIDATION_ERROR]: 422,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.CONFLICT]: 409,
};

export class SelfLessError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: Record<string, unknown>;

  constructor(code: ErrorCode, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'SelfLessError';
    this.code = code;
    this.details = details;
  }

  get httpStatus(): number {
    return ERROR_HTTP_STATUS[this.code] ?? 500;
  }
}
