import { IsString, IsNumber, IsOptional } from 'class-validator';
import { VALIDATION_MESSAGE } from '../../../common/validation/validation';

export class UpdateVaseDto {
	@IsString({ message: VALIDATION_MESSAGE.string('name') })
	@IsOptional()
	name?: string;

	@IsString({ message: VALIDATION_MESSAGE.string('description') })
	@IsOptional()
	description?: string;

	@IsString({ message: VALIDATION_MESSAGE.string('color') })
	@IsOptional()
	color?: string;

	@IsNumber({}, { message: VALIDATION_MESSAGE.number('height') })
	@IsOptional()
	height?: number;
}
