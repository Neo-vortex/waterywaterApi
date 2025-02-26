import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).send('Unauthorized');
		return;
	}
	next();
};
