import { NullableType } from 'src/utils/types/nullable.type';

import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Chapter } from '../domain/chapter';
import { FilterChapterDto, SortChapterDto } from '../dto/query-lesson.dto';
import { ChapterEntity } from './persistence/relational/entities/lesson.entity';
import { UpdatechapterDto } from '../dto/update-lesson.dto';

export abstract class chapterRepository {
  abstract create(data: Omit<Chapter, 'id'>): Promise<Chapter>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
  }: {
    filterOptions?: FilterChapterDto | null;
    sortOptions?: SortChapterDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Chapter[]>;

  abstract findOne(
    fields: EntityCondition<ChapterEntity>,
  ): Promise<NullableType<ChapterEntity>>;

   /*abstract update(
     id: Chapter['id'],
     payload: UpdatechapterDto,
   ): Promise<Chapter | null>*/

   abstract softDelete(id: Chapter['id']): Promise<void>;
}
