import {
	ExistedError,
	NotFoundError,
	ValidationError
} from '../../common/error/baseError';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';

export const register = async (createUserDto: CreateUserDto) => {
	const { username, password } = createUserDto;
	const existedUser = await UserRepository.findByUsername(username);

	if (existedUser) {
		throw new ExistedError(
			`an account with username of ${username} already existed`
		);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	return await UserRepository.createUser({
		username,
		password: hashedPassword
	});
};

export const login = async (createUserDto: CreateUserDto) => {
	const { username, password } = createUserDto;
	const user = await UserRepository.findByUsername(username);

	if (!user) {
		throw new NotFoundError(`${username} does not exist`);
	}

	const validatePassword = await bcrypt.compare(password, user.password);

	if (!validatePassword) {
		throw new ValidationError('username or password is wrong');
	}

	const accessToken = jwt.sign({ username }, accessTokenSecret, {
		expiresIn: '1d'
	});

	return {
		accessToken
	};
};

export const verifyToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, accessTokenSecret);

		return decoded;
	} catch (error) {
		throw error;
	}
};
