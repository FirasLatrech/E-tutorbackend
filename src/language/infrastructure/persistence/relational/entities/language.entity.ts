import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

import { language } from 'src/language/domain/language';

@Entity({
  name: 'Language',
})
export class LanguageEntity extends EntityRelationalHelper implements language {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  // @OneToMany(() => courseEntity, (course) => course.course_language)
  // language_courses: courseEntity[];
  // @OneToMany(() => courseEntity, (course) => course.subtitle_language)
  // courses_sub_languages: courseEntity[];

  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
