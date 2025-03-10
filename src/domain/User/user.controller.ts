import { Controller, Get, Path, Route, Response, Tags, Security } from 'tsoa';
import { User } from './user.entity';
import { getUserById, getUsers } from './user.service';
import {
	NotFoundError,
	ValidationError,
	AuthenticationError
} from '../../common/error/baseError';

@Route('/users')
@Tags('Users')
export class UserController extends Controller {
	@Get()
	@Security('jwt')
	@Response<AuthenticationError>(401, 'Authentication Error')
	async getUsersHandler() {
		return await getUsers();
	}

	@Get('{userId}')
	@Security('jwt')
	@Response<NotFoundError>(404, 'User not found')
	@Response<ValidationError>(400, 'Validation Error')
	@Response<AuthenticationError>(401, 'Authentication Error')
	async getUserByIdHandler(@Path() userId: User['id']) {
		try {
			return await getUserById(userId);
		} catch (err) {
			if (err instanceof ValidationError) {
				this.setStatus(400);
				throw err;
			}
			if (err instanceof NotFoundError) {
				this.setStatus(404);
				throw err;
			}
			throw err;
		}
	}
}
