import { LanguageEntity } from 'src/language/infrastructure/persistence/relational/entities/language.entity';

import { CategoryEntity } from 'src/category/infrastructure/persistence/relational/entities/category.entity';
import { Course } from 'src/courses/domain/course';
import { LevelEntity } from 'src/level/infrastructure/persistence/relational/entities/level.entity';

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
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import UUIDv4 generator function
import { ChapterEntity } from 'src/chapter/infrastructure/persistence/relational/entities/chapter.entity';
import { IsString } from 'class-validator';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

@Entity({ name: 'course' })
export class CourseEntity extends EntityRelationalHelper implements Course {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @ManyToOne(() => CategoryEntity, (Category) => Category.courses, {
    cascade: true,
  })
  @JoinColumn({ name: 'course_category' })
  course_category?: CategoryEntity;

  @ManyToOne(
    () => CategoryEntity,
    (category) => category.sub_courses_category,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'course_sub_category' })
  course_sub_category?: CategoryEntity;

  @ManyToOne(() => LanguageEntity, (language) => language.language_courses, {
    cascade: true,
  })
  @JoinColumn({ name: 'course_language' })
  course_language: LanguageEntity;

  @ManyToOne(
    () => LanguageEntity,
    (language) => language.courses_sub_languages,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'subtitle_language' })
  subtitle_language?: LanguageEntity;

  @ManyToMany(() => UserEntity, (user) => user.my_courses, {
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

  @ManyToMany(() => UserEntity, (user) => user?.user_courses, {
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

  @ManyToMany(() => UserEntity, (user) => user?.user_courses, {
    cascade: true,
  })
  @JoinTable({
    name: 'purchase',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  purchase: UserEntity[];

  @OneToMany(() => ChapterEntity, (chapter) => chapter.course)
  chapters: ChapterEntity[];

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

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  course_thumbnail?: FileEntity;

  @Column({ nullable: true })
  course_trailer?: string;

  @Column({ nullable: true })
  course_descriptions?: string;

  @Column('jsonb', { nullable: true })
  course_content?: string[];

  @Column('jsonb', { nullable: true })
  target_audience?: string[];

  @Column('jsonb', { nullable: true })
  course_requirements?: string[];

  @Column('jsonb', { nullable: true })
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

  @Column({ default: true })
  isDraft: boolean;

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
