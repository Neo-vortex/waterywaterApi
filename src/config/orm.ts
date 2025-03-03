import { DataSource } from 'typeorm';
import { User } from '../domain/User/user.entity';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '5432', 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: false,
	logging: false,
	entities: [User]
});
