
import { NullableType } from '../../../utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterratingDto,
  SortratingDto,
} from 'src/rating/dto/query-rating.dto'; // Import DTOs for filtering and sorting ratings
import { Rating } from 'src/rating/domain/rating';

export abstract class RatingRepository {
  abstract findOne(
    options: EntityCondition<Rating>,
  ): Promise<NullableType<Rating>>;

  abstract create(data: Omit<Rating, 'id' >): Promise<Rating>; // Adjust fields to match Rating entity, remove id and dateTime

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterratingDto | null;
    sortOptions?: SortratingDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Rating[]>;

  abstract softDelete(id: Rating['id']): Promise<void>; // Adjust id type to match Rating entity
}
