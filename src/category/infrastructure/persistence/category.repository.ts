import { Category } from 'src/category/domain/category';
import { NullableType } from '../../../utils/types/nullable.type';

import { User } from 'src/users/domain/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterCategoryDto,
  SortCategoryDto,
} from 'src/category/dto/query-category.dto';
import { Injectable } from '@nestjs/common';
export abstract class CategoryRepository {
  abstract findOne(
    options: EntityCondition<Category>,
  ): Promise<NullableType<Category>>;

  abstract create(
    data: Omit<Category, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Category>;

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
