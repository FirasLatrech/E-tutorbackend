import { UUID } from 'node:crypto';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';
import { CategoryEntity } from 'src/category/infrastructure/persistence/relational/entities/category.entity';
import { Course } from 'src/courses/domain/course';
import { LevelEntity } from 'src/level/infrastructure/persistence/relational/entities/Level.entity';

import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import UUIDv4 generator function

@Entity({ name: 'course' })
export class CourseEntity extends EntityRelationalHelper implements Course {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @ManyToOne(() => CategoryEntity, (Category) => Category.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'course_category' })
  course_category?: CategoryEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'course_sub_category' })
  course_sub_category?: CategoryEntity;

  @ManyToOne(() => LanguageEntity, (language) => language.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'course_language' })
  course_language: LanguageEntity;

  @ManyToOne(() => LanguageEntity, (language) => language.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'subtitle_language' })
  subtitle_language?: LanguageEntity;

  @ManyToMany((type) => UserEntity, (user) => user.my_courses, {
    cascade: true,
  })
  @JoinTable({
    name: 'course_instructor',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'instructor_id',
      referencedColumnName: 'id',
    },
  })
  instructor: UserEntity[];

  @Column({ nullable: true })
  course_topic: string;

  @ManyToMany((type) => UserEntity, (user) => user?.user_courses, {
    cascade: true,
  })
  @JoinTable({
    name: 'course_user',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  user_courses: UserEntity[];

  @Column({ default: 0 })
  enrollmentCount?: number;

  @Column({ default: 0 })
  rating?: number;
  @ManyToOne(() => LevelEntity, (level) => level.id, {
    cascade: true,
  })
  course_level: LevelEntity;
  // @ManyToOne((type) => LevelEntity)
  // course_level: LevelEntity['id'];
  // @ManyToOne((type) => LevelEntity)
  // course_level: LevelEntity['id'];

  @Column({ nullable: true })
  durations: string;

  @Column({ nullable: true })
  course_thumbnail?: string;




  @Column({ nullable: true })
  course_trailer?: string;

  @Column('json', { nullable: true })
  course_descriptions?: any;

  @Column('json', { nullable: true })
  course_content?: any;

  @Column('json', { nullable: true })
  target_audience?: any;

  @Column('json', { nullable: true })
  course_requirements?: any;

  @Column('json', { nullable: true })
  course_curriculum?: any;

  @Column({ nullable: true })
  welcome_message?: string;

  @Column({ nullable: true })
  congratulation_message?: string;

  @Column({ nullable: true })
  course_price?: string;

  @Column({ nullable: true })
  discount?: string;

  @Column({ nullable: true, default: 0 })
  progress?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

// @ManyToMany((type) => User, { cascade: true })
// @JoinTable()
// instructor: User[];