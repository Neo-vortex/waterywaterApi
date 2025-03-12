import { FindManyOptions } from 'typeorm';
import { NotFoundError, ValidationError } from '../../common/error/baseError';
import { Vase } from './vase.entity';
import { VaseRepository } from './vase.repository';
import { CreateVaseDto } from './dto/create-vase.dto';
import { UpdateVaseDto } from './dto/update-vase.dto';
import { VaseResponseDto } from './dto/vase-response.dto';

export const getVases = async (
	options?: FindManyOptions<Vase>
): Promise<VaseResponseDto[]> => {
	return await VaseRepository.find({
		...options,
		relations: ['user']
	});
};

export const getVaseById = async (id: Vase['id']): Promise<VaseResponseDto> => {
	if (!id) throw new ValidationError('property "id" is missing');

	const vase = await VaseRepository.findOne({
		where: { id },
		relations: ['user']
	});

	if (!vase) throw new NotFoundError(`vase with id of ${id} not found`);

	return vase;
};

export const getVasesByUserId = async (
	userId: string
): Promise<VaseResponseDto[]> => {
	if (!userId) throw new ValidationError('property "userId" is missing');

	return await VaseRepository.find({
		where: { userId },
		relations: ['user']
	});
};

export const createVase = async (
	data: CreateVaseDto
): Promise<VaseResponseDto> => {
	const vase = VaseRepository.create(data);
	return await VaseRepository.save(vase);
};

export const updateVase = async (
	id: Vase['id'],
	data: UpdateVaseDto
): Promise<VaseResponseDto> => {
	if (!id) throw new ValidationError('property "id" is missing');

	const vase = await getVaseById(id);
	Object.assign(vase, data);

	return await VaseRepository.save(vase);
};

// export const deleteVase = async (
// 	id: Vase['id']
// ): Promise<{ message: string }> => {
// 	if (!id) throw new ValidationError('property "id" is missing');

// 	const vase = await getVaseById(id);
// 	await VaseRepository.remove(vase);

// 	return { message: 'Vase deleted successfully' };
// };
