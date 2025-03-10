import { FindManyOptions } from 'typeorm';
import { NotFoundError, ValidationError } from '../../common/error/baseError';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

export const getUsers = async (options?: FindManyOptions<User>) => {
	return await UserRepository.find({
		...options,
		select: { id: true, username: true }
	});
};

export const getUserById = async (id: User['id']) => {
	if (!id) throw new ValidationError('property "id" is missing');

	const user = await UserRepository.findOneBy({ id });

	if (!user) throw new NotFoundError(`user with id of ${id} not found`);

	return { id: user.id, username: user.username };
};

export const deleteUser = async (id: User['id']) => {
	if (!id) throw new ValidationError('property "id" is missing');

	const user = await UserRepository.findOneBy({ id });
	if (!user) throw new NotFoundError(`user with id of ${id} not found`);

	await UserRepository.remove(user);
	return { message: 'User deleted successfully' };
};
