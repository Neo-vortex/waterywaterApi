import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AppDataSource } from '../../config/orm';

export const UserRepository: Repository<User> = AppDataSource.getRepository(User);
