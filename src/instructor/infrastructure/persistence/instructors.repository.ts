import { Instructor } from '../../domain/instructor';
import { NullableType } from 'src/utils/types/nullable.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import {
  FilterinstructorDto,
  SortinstructorDto,
} from 'src/instructor/dto/query-user.dto';

export abstract class InstructorRepository {
  abstract create(
    data, // data: Omit<Instructor, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Instructor>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterinstructorDto | null;
    sortOptions?: SortinstructorDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Instructor[]>;

  abstract findOne(
    fields: EntityCondition<Instructor>,
  ): Promise<NullableType<Instructor>>;

  abstract update(
    id: Instructor['id'],
    payload: DeepPartial<Instructor>,
  ): Promise<Instructor | null>;

  abstract softDelete(id: Instructor['id']): Promise<void>;
}
