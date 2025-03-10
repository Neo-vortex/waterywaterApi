import { Controller, Get, Path, Route, Tags, Security, Delete } from 'tsoa';
import { User } from './user.entity';
import { getUserById, getUsers, deleteUser } from './user.service';
import { ValidationError, NotFoundError } from '../../common/error/baseError';
import { CommonResponses } from '../../common/decorators/commonResponses.decorator';

@Route('/users')
@Tags('Users')
export class UserController extends Controller {
	@Get()
	@Security('jwt')
	@CommonResponses()
	async getUsersHandler() {
		return await getUsers();
	}

	@Get('{userId}')
	@Security('jwt')
	@CommonResponses()
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

	@Delete('{userId}')
	@Security('jwt')
	@CommonResponses()
	async deleteUserHandler(@Path() userId: User['id']) {
		try {
			return await deleteUser(userId);
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
