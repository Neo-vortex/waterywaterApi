import { Request } from 'express';
import { AuthenticationError } from '../common/error/baseError';
import { verifyToken } from '../domain/User/auth.service';

export function expressAuthentication(
	request: Request,
	securityName: string,
	scopes?: string[]
): Promise<any> {
	const token = request.headers.authorization?.split(' ')[1];

	if (!token) {
		return Promise.reject(new AuthenticationError('No token provided'));
	}

	try {
		const user = verifyToken(token);
		return Promise.resolve(user);
	} catch (error) {
		return Promise.reject(
			new AuthenticationError('Token is expired or invalid')
		);
	}
}
