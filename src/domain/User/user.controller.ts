import { Body, Controller, Post, Route, Response, SuccessResponse, Get, Put, Delete, Path } from 'tsoa';
import { User } from './user.entity';
import { UserService } from './user.service';
import { NotFoundError, ValidationError } from '../../common/error/baseError';
import { CreateUserDto } from './dto/create-user.dto';
const userService = new UserService();

interface ValidateErrorJSON {
	message: 'Validation failed';
	details: { [name: string]: any };
}

interface ErrorResponse {
	message: string;
}

@Route('users')
export class UsersController extends Controller {
	/**
	 * Retrieve all users
	 */
	@Get('/')
	public async getAllUsers(): Promise<User[]> {
		const test = await userService.getAllUsers();
		return test;
	}

	/**
	 * Retrieve a user by ID
	 * @param id User's ID
	 */
	@Get('/{id}')
	@Response<NotFoundError>(404, 'User not found')
	@Response<ValidationError>(422, 'Validation Failed')
	async getUserByIdHandler(@Path() id: User['id']) {
		try {
			const user = await userService.getUserById(id);

			return user;
		} catch (err: any) {
			console.log(err);
			this.setStatus(err.statusCode);
			throw err;
		}
	}

	/**
	 * Create a new user
	 * @param requestBody User details
	 */
	@SuccessResponse('201', 'Created')
	@Response<ValidateErrorJSON>(422, 'Validation Failed')
	@Post()
	public async createUser(@Body() requestBody: CreateUserDto): Promise<CreateUserDto> {
		this.setStatus(201);
		return await userService.createUser(requestBody);
	}

	/**
	 * Update an existing user by ID
	 * @param id User's ID
	 * @param requestBody New data for the user
	 */
	@Put('/{id}')
	@Response<ErrorResponse>(404, 'User not found')
	public async updateUser(@Path() id: number, @Body() requestBody: Partial<User>): Promise<User | null> {
		const user = await userService.updateUser(id, requestBody);
		if (!user) {
			this.setStatus(404);
			return { message: `User with ID ${id} not found` } as any;
		}
		return user;
	}

	/**
	 * Delete a user by ID
	 * @param id User's ID
	 */
	@Delete('/{id}')
	@Response<ErrorResponse>(404, 'User not found')
	@SuccessResponse(204, 'Deleted')
	public async deleteUser(@Path() id: number): Promise<void> {
		const success = await userService.deleteUser(id);
		if (!success) {
			this.setStatus(404);
			return { message: `User with ID ${id} not found` } as any;
		}
		this.setStatus(204);
		return;
	}
}
