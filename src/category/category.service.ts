import { Injectable } from '@nestjs/common';

import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from 'src/utils/types/nullable.type';
import { Category } from 'src/Category/domain/Category';
import { CategoryRepository } from './infrastructure/persistence/category.repository';
import { SessionService } from 'src/session/session.service';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FilterCategoryDto, SortCategoryDto } from './dto/query-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private sessionService: SessionService,
  ) {}

  findOne(options: EntityCondition<Category>): Promise<NullableType<Category>> {
    return this.categoryRepository.findOne(options);
  }

  async create(
    data: Omit<Category, 'id' | 'createdAt' | 'deletedAt'>,
    user_id: number,
  ): Promise<Category> {
    const newData = { ...data, create_by: user_id };
    // const session = await this.sessionService.findOne({
    //   id: sessionId,
    // });
    // console.log(session);
    console.log(newData);
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
