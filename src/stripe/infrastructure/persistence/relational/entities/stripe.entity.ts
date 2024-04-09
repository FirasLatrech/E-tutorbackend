import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Category } from 'src/category/domain/category';
import { v4 as uuidv4 } from 'uuid'; // Import UUIDv4 generator function
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'Category',
})
export class CategoryEntity extends EntityRelationalHelper implements Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();
  @Column()
  create_by: string;
  @Column()
  name: string;
  @Column()
  color: string;
  @Column({ default: null, nullable: true })
  background_color: string;
  @Column()
  icon: string;
  @Column({ default: 0 })
  courses_count: number;

  @OneToMany(() => CourseEntity, (course) => course.course_category, {
    eager: true,
  })
  courses: CourseEntity[];
  @OneToMany(() => CourseEntity, (course) => course.course_sub_category, {
    eager: true,
  })
  sub_courses_category: CourseEntity[];

  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
