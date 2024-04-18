import { NullableType } from 'src/utils/types/nullable.type';

import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';

import { FilterLessonDto, SortLessonDto } from '../dto/query-lesson.dto';

import { Lesson } from '../domain/lesson';

export abstract class LessonRepository {
  abstract create(data: Omit<Lesson, 'id'>): Promise<Lesson>;

  abstract findManyLessonOfChapterWithPagination({
    chapter_id,
    sortOptions,
    search,
    paginationOptions,
  }: {
    chapter_id?: string;
    sortOptions?: SortLessonDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Lesson[]>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
  }: {
    filterOptions?: FilterLessonDto | null;
    sortOptions?: SortLessonDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Lesson[]>;

  abstract findOne(
    fields: EntityCondition<Lesson>,
  ): Promise<NullableType<Lesson | null>>;

  /*abstract update(
     id: Lesson['id'],
     payload: UpdateLessonDto,
   ): Promise<Lesson | null>*/

  abstract softDelete(id: Lesson['id']): Promise<void>;
}
