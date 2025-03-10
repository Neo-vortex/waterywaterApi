import AppDataSource from '../../config/appDataSource';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

export const UserRepository = AppDataSource.getRepository(User).extend({
	async findByUsername(username: User['username']) {
		return await this.findOneBy({ username });
	},

	async createUser(createUserDto: CreateUserDto) {
		const createdUser = this.create(createUserDto);

		return await this.save(createdUser);
	},

	async updateUser(id: User['id'], updateUserDto: UpdateUserDto) {
		return await this.update(id, updateUserDto);
	}
});
