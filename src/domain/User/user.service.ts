import { User } from './user.entity';
import { UserRepository } from './user.repository';

export class UserService {
	async getAllUsers(): Promise<User[]> {
		return await UserRepository.find();
	}

	async getUserById(id: number): Promise<User | null> {
		return await UserRepository.findOneBy({ id });
	}

	async createUser(data: Partial<User>): Promise<User> {
		const user = UserRepository.create(data);
		return await UserRepository.save(user);
	}

	async updateUser(id: number, data: Partial<User>): Promise<User | null> {
		const user = await this.getUserById(id);
		if (!user) return null;
		return await UserRepository.save({ ...user, ...data });
	}

	async deleteUser(id: number): Promise<boolean> {
		const result = await UserRepository.delete(id);
		return result.affected !== 0;
	}
}
