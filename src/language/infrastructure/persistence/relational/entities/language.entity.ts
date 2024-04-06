import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

import { language } from 'src/language/domain/language';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'Language',
})
export class LanguageEntity extends EntityRelationalHelper implements language {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => CourseEntity, (course) => course.course_language, {
    eager: true,
  })
  language_courses: CourseEntity[];
  @OneToMany(() => CourseEntity, (course) => course.subtitle_language, {
    eager: true,
  })
  courses_sub_languages: CourseEntity[];

  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
