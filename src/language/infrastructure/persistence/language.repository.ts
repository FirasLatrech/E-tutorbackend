import { language } from 'src/language/domain/language';
import { NullableType } from '../../../utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterLanguageryDto,
  SortLanguageryDto,
} from 'src/language/dto/query-language.dto';

export abstract class LanguageRepository {
  abstract findOne(
    options: EntityCondition<language>,
  ): Promise<NullableType<language>>;
  abstract create(
    data: Omit<language, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<language>;
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLanguageryDto | null;
    sortOptions?: SortLanguageryDto[] | null;
    paginationOptions: IPaginationOptions;
  });
}
