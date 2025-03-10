import { Body, Controller, Post, Route, Response, Tags } from 'tsoa';
import { CreateUserDto } from './dto/create-user.dto';
import { login, register } from './auth.service';
import {
	ExistedError,
	NotFoundError,
	ValidationError
} from '../../common/error/baseError';

@Route('/auth')
@Tags('Authentication')
export class AuthController extends Controller {
	@Response<NotFoundError>(404, 'User Not Found Error')
	@Response<ValidationError>(400, 'Validation Error')
	@Post('login')
	async loginHandler(@Body() createUserDto: CreateUserDto) {
		try {
			const tokens = await login(createUserDto);

			return tokens;
		} catch (error) {
			error instanceof NotFoundError
				? this.setStatus(404)
				: this.setStatus(400);
			return error;
		}
	}

	@Response<ExistedError>(400, 'Existed User Error')
	@Post('register')
	async registerHandler(@Body() createUserDto: CreateUserDto) {
		try {
			await register(createUserDto);

			return { status: 'success' };
		} catch (error) {
			this.setStatus(400);
			return error;
		}
	}
}
