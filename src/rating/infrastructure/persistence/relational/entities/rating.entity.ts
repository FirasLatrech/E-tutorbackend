import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'Rating',
})
export class RatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  ratedEntityId: string; // Assuming this is the ID of the entity being rated

  @ManyToOne(() => UserEntity, (user) => user.rating)
  user: UserEntity; // Assuming this is the ID of the user giving the rating

  @Column({ type: 'float' })
  ratingValue: number; // Assuming this stores the rating value

  @Column({ nullable: true })
  comments: string; // Optional field for comments

  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the rating was created

  @DeleteDateColumn()
  deletedAt: Date; // Timestamp of when the rating was deleted (if soft delete is used)
}
