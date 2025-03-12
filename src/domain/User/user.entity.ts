import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Vase } from '../Vase/vase.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@OneToMany(() => Vase, (vase) => vase.user)
	vases: Vase[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
