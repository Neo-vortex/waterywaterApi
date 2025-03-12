import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { User } from '../User/user.entity';

@Entity()
export class Vase {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@Column()
	color: string;

	@Column()
	height: number;

	@Column()
	userId: string;

	@ManyToOne(() => User, (user) => user.vases)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
