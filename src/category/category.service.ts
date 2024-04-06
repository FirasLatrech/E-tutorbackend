import { Injectable } from '@nestjs/common';

import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from 'src/utils/types/nullable.type';
import { Category } from 'src/Category/domain/Category';
import { CategoryRepository } from './infrastructure/persistence/category.repository';
import { SessionService } from 'src/session/session.service';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FilterCategoryDto, SortCategoryDto } from './dto/query-category.dto';

import {
  FilterCourseDto,
  SortCourseDto,
} from 'src/courses/dto/query-course.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private sessionService: SessionService,
  ) {}

  findOne(options: EntityCondition<Category>): Promise<NullableType<Category>> {
    return this.categoryRepository.findOne(options);
  }
  async getAllCourseOfCategory({
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
    categor_id,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
    categor_id: string;
  }) {
    return await this.categoryRepository.getAllCourseOfCategory({
      filterOptions,
      sortOptions,
      paginationOptions,
      search,
      categor_id,
    });
  }
  async getAllInstructorOfCategory({
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
    categor_id,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
    categor_id: string;
  }) {
    return await this.categoryRepository.getAllInstructorOfCategory({
      filterOptions,
      sortOptions,
      paginationOptions,
      search,
      categor_id,
    });
  }
  async getGategoryDetails(category_id: string) {
    return await this.categoryRepository.getGategoryDetails(category_id);
  }

  async create(
    data: Omit<Category, 'id' | 'createdAt' | 'deletedAt'>,
    user_id: string,
  ): Promise<Category> {
    const newData = { ...data, create_by: user_id };

    const result = this.categoryRepository.create(newData);
    return result;
  }

  async softDelete(id: Category['id']): Promise<void> {
    await this.categoryRepository.softDelete(id);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]> {
    return this.categoryRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
