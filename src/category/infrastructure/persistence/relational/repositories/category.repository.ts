import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { NullableType } from '../../../../../utils/types/nullable.type';

import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CategoryMapper } from '../mappers/category.mapper';
import { Category } from 'src/category/domain/category';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepository } from '../../category.repository';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterCategoryDto,
  SortCategoryDto,
} from 'src/category/dto/query-category.dto';

@Injectable()
export class CategoryRelationalRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {}

  async findOne(
    options: EntityCondition<Category>,
  ): Promise<NullableType<Category>> {
    const entity = await this.CategoryRepository.findOne({
      where: options as FindOptionsWhere<CategoryEntity>,
    });

    return entity ? CategoryMapper.toDomain(entity) : null;
  }
  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]> {
    const where: FindOptionsWhere<CategoryEntity> = {};

    if (filterOptions) {
      Object.assign(where, filterOptions);
    }

    const entities = await this.CategoryRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce((accumulator, sort) => {
        accumulator[sort.orderBy] = sort.order;
        return accumulator;
      }, {}),
    });

    return entities.map((category) => CategoryMapper.toDomain(category));
  }
  async create(data: Category): Promise<Category> {
    const persistenceModel = CategoryMapper.toPersistence(data);

    return this.CategoryRepository.save(
      this.CategoryRepository.create(persistenceModel),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.CategoryRepository.softDelete({
      id,
    });
  }
}
