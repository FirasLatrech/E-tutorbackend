import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { v4 as uuidv4 } from 'uuid'; // Import UUIDv4 generator function
@Entity({
  name: 'instructor',
})
export class InstructorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  bio: string;

  @ManyToOne(() => UserEntity, (user) => user.instructors)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
