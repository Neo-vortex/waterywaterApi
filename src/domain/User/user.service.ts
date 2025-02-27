import { emailRegex, passwordRegex } from '../../utils/regex';
import { NotFoundError, ValidationError } from '../../common/error/baseError';
import { ErrorMessage } from '../../common/dictionary/error';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

export class UserService {
	async getAllUsers(): Promise<User[]> {
		return await UserRepository.find();
	}

	async getUserById(id: number) {
		const user = await UserRepository.findOneBy({ id });

		if (!user) throw new NotFoundError(`user with id of ${id} not found`);

		return user;
	}

	async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
		if (!createUserDto.email || !createUserDto.name || !createUserDto.password)
			throw new ValidationError(ErrorMessage.requiredAllField);
		if (!emailRegex.test(createUserDto.email)) throw new ValidationError(ErrorMessage.emailFormat);
		if (!passwordRegex.test(createUserDto.password)) throw new ValidationError(ErrorMessage.passwordFormat);
		const user = UserRepository.create(createUserDto);
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
