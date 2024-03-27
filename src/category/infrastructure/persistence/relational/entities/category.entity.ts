import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Category } from 'src/category/domain/category';

@Entity({
  name: 'Category',
})
export class CategoryEntity extends EntityRelationalHelper implements Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  create_by: number;
  @Column()
  name: string;
  @Column()
  color: string;
  @Column()
  icon: string;
  @Column({ default: 0 })
  courses_count: number;

  // @OneToMany(() => courseEntity, (course) => course.course_category)
  // courses: courseEntity[];
  // @OneToMany(() => courseEntity, (course) => course.course_sub_category)
  // sub_category: courseEntity[];

  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
