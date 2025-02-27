import { HTTPStatusCode } from './httpStatusCode';

class BaseError {
	message: string;
	statusCode: number;

	constructor(message: string, statusCode: number) {
		this.message = message;
		this.statusCode = statusCode;
	}
}

export class NotFoundError extends BaseError {
	constructor(message: string) {
		super(message, HTTPStatusCode.NotFound);
	}
}

export class ValidationError extends BaseError {
	constructor(message: string) {
		super(message, HTTPStatusCode.BadRequest);
	}
}

export class ExistedError extends BaseError {
	constructor(message: string) {
		super(message, HTTPStatusCode.BadRequest);
	}
}

export class AuthenticationError extends BaseError {
	constructor(message: string) {
		super(message, HTTPStatusCode.Unauthorized);
	}
}
