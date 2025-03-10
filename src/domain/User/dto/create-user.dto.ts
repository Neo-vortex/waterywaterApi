import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { VALIDATION_MESSAGE } from '../../../common/validation/validation';

export class CreateUserDto {
	@IsString({ message: VALIDATION_MESSAGE.string('username') })
	@IsNotEmpty({ message: VALIDATION_MESSAGE.notEmpty('username') })
	username: string;

	@IsString({ message: VALIDATION_MESSAGE.string('password') })
	@IsNotEmpty({ message: VALIDATION_MESSAGE.notEmpty('password') })
	password: string;
}
