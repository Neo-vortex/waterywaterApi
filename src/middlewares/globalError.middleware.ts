import { Request, Response, NextFunction } from 'express';

export const globalErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err.statusCode || 500;
	const message = err.message || 'Something went wrong';
	const errorDetails = {
		message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
	};

	res.status(status).json(errorDetails);
};
