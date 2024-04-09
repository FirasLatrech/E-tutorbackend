import { Category } from 'src/category/domain/category';
import { NullableType } from '../../../utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterCategoryDto,
  SortCategoryDto,
} from 'src/category/dto/query-category.dto';
import {
  FilterCourseDto,
  SortCourseDto,
} from 'src/courses/dto/query-course.dto';

export abstract class CategoryRepository {
  abstract findOne(
    options: EntityCondition<Category>,
  ): Promise<NullableType<Category>>;
  abstract getAllCourseOfCategory({
    filterOptions,
    sortOptions,
    paginationOptions,
    search,
    categor_id,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    search: string;
    categor_id: string;
  });
  abstract getAllInstructorOfCategory({
    filterOptions,
    sortOptions,
    paginationOptions,
    search,
    categor_id,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    search: string;
    categor_id: string;
  });
  abstract create(
    data: Omit<Category, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Category>;
  abstract getGategoryDetails(category_id: string);
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]>;
  abstract softDelete(id: Category['id']): Promise<void>;
}
