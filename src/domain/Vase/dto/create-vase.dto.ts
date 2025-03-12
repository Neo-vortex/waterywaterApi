import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';
import { VALIDATION_MESSAGE } from '../../../common/validation/validation';

export class CreateVaseDto {
	@IsString({ message: VALIDATION_MESSAGE.string('name') })
	@IsNotEmpty({ message: VALIDATION_MESSAGE.notEmpty('name') })
	name: string;

	@IsString({ message: VALIDATION_MESSAGE.string('description') })
	description?: string;

	@IsString({ message: VALIDATION_MESSAGE.string('color') })
	@IsNotEmpty({ message: VALIDATION_MESSAGE.notEmpty('color') })
	color: string;

	@IsNumber({}, { message: VALIDATION_MESSAGE.number('height') })
	@IsNotEmpty({ message: VALIDATION_MESSAGE.notEmpty('height') })
	height: number;

	@IsUUID('4', { message: VALIDATION_MESSAGE.uuid('userId') })
	@IsNotEmpty({ message: VALIDATION_MESSAGE.notEmpty('userId') })
	userId: string;
}
