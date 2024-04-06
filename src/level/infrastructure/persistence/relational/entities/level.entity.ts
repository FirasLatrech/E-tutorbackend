import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Level } from 'src/level/domain/level';

@Entity({
  name: 'Level',
})
export class LevelEntity extends EntityRelationalHelper implements Level {
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
