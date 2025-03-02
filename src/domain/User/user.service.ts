// user.service.ts
import { emailRegex, passwordRegex } from '../../utils/regex';
import { NotFoundError, ValidationError } from '../../common/error/baseError';
import { ErrorMessage } from '../../common/dictionary/error';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcryptjs';

export class UserService {
	async getAllUsers(): Promise<User[]> {
		return await UserRepository.find();
	}

	async getUserById(id: User['id']) {
		const user = await UserRepository.findOneBy({ id });

		if (!user) throw new NotFoundError(`user with id of ${id} not found`);

		return user;
	}

	async getUserByEmail(email: string): Promise<User | null> {
		const user = await UserRepository.findOneBy({ email });
		return user;
	}

	async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
		const findUser = await UserRepository.findOneBy({
			email: createUserDto.email
		});

		if (findUser) throw new ValidationError(ErrorMessage.existUser);

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

		createUserDto.password = hashedPassword;

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
