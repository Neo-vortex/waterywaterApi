import { UserService } from './user.service';
import { Get, Route, Tags, Post, Put, Delete, Body, Path } from 'tsoa'; // Import tsoa decorators
import { User } from './user.entity'; // Assume there's a `User` model

const userService = new UserService(); // Dependency injection can be used here in real-world apps

@Route('users') // Base route for the controller
@Tags('User') // Tag used for OpenAPI documentation grouping
export class UserController {
	/**
	 * Retrieve all users
	 */
	@Get('/')
	public async getAllUsers(): Promise<User[]> {
		return await userService.getAllUsers();
	}

	/**
	 * Retrieve a user by ID
	 * @param id User's ID
	 */
	@Get('/{id}')
	public async getUserById(@Path() id: number): Promise<User | null> {
		const user = await userService.getUserById(id);
		if (!user) {
			throw new Error(`User with ID ${id} not found`); // Alternatively, use custom exceptions
		}
		return user;
	}

	/**
	 * Create a new user
	 * @param requestBody User details
	 */
	@Post('/')
	public async createUser(@Body() requestBody: Partial<User>): Promise<User> {
		return await userService.createUser(requestBody);
	}

	/**
	 * Update an existing user by ID
	 * @param id User's ID
	 * @param requestBody New data for the user
	 */
	@Put('/{id}')
	public async updateUser(@Path() id: number, @Body() requestBody: Partial<User>): Promise<User | null> {
		const user = await userService.updateUser(id, requestBody);
		if (!user) {
			throw new Error(`User with ID ${id} not found`);
		}
		return user;
	}

	/**
	 * Delete a user by ID
	 * @param id User's ID
	 */
	@Delete('/{id}')
	public async deleteUser(@Path() id: number): Promise<void> {
		const success = await userService.deleteUser(id);
		if (!success) {
			throw new Error(`User with ID ${id} not found`);
		}
	}
}
