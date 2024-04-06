import { Level } from 'src/Level/domain/Level';
import { NullableType } from '../../../utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterLevelryDto,
  SortLevelryDto,
} from 'src/Level/dto/query-level.dto';

export abstract class LevelRepository {
  abstract findOne(
    options: EntityCondition<Level>,
  ): Promise<NullableType<Level>>;
  abstract create(
    data: Omit<Level, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Level>;
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLevelryDto | null;
    sortOptions?: SortLevelryDto[] | null;
    paginationOptions: IPaginationOptions;
  });
}
