import { Response } from 'tsoa';
import { NotFoundError, ValidationError, AuthenticationError } from '../error/baseError';

export function CommonResponses() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Response<NotFoundError>(404, 'Not found')(target, propertyKey, descriptor);
    Response<ValidationError>(400, 'Validation Error')(target, propertyKey, descriptor);
    Response<AuthenticationError>(401, 'Authentication Error')(target, propertyKey, descriptor);
    return descriptor;
  };
} 