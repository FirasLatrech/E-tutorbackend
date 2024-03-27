import { NullableType } from 'src/utils/types/nullable.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { course } from 'src/courses/domain/course';
import { courseEntity } from './relational/entities/course.entity';

export abstract class CourseRepository {
  abstract create(data: Omit<course, 'id'>): Promise<course>;

  // abstract findManyWithPagination({
  //   filterOptions,
  //   sortOptions,
  //   paginationOptions,
  // }: {
  //   filterOptions?: FilterCourseDto | null;
  //   sortOptions?: SortCourseDto[] | null;
  //   paginationOptions: IPaginationOptions;
  // }): Promise<Course[]>;

  abstract findOne(
    fields: EntityCondition<courseEntity>,
  ): Promise<NullableType<courseEntity>>;

  // abstract update(
  //   id: Course['id'],
  //   payload: DeepPartial<Course>,
  // ): Promise<Course | null>;

  // abstract softDelete(id: Course['id']): Promise<void>;
}
