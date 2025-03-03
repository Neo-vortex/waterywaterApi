import { Response, Request, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

export function validationErrorMiddleware(
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ValidateError) {
		console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
		res.status(400).json({
			message: 'Validation Failed',
			details: err.fields
		});
	}

	if (err instanceof Error) {
		res.status(500).json({
			message: 'Internal Server Error',
			details: err.message
		});
	}

	next(err);
}
