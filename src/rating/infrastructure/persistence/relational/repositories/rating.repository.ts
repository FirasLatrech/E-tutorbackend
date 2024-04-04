import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { RatingEntity } from '../entities/rating.entity'; // Import RatingEntity

import { RatingMapper } from '../mappers/rating.mapper'; // Import RatingMapper
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterratingDto as FilterRatingDto,
  SortratingDto as SortRatingDto,
} from 'src/rating/dto/query-rating.dto'; // Import DTOs for filtering and sorting ratings
import { Rating } from 'src/rating/domain/rating';

@Injectable()
export class RatingRelationalRepository {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}

  async findOne(options): Promise<NullableType<Rating>> {
    const entity = await this.ratingRepository.findOne(options);
    return entity ? RatingMapper.toDomain(entity) : null;
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterRatingDto | null;
    sortOptions?: SortRatingDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Rating[]> {
    // const where: FindConditions<RatingEntity> = {};

    // if (filterOptions) {
    //   Object.assign(where, filterOptions);
    // }

    const entities = await this.ratingRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      // where: where,
      order: sortOptions?.reduce((accumulator, sort) => {
        accumulator[sort.orderBy] = sort.order;
        return accumulator;
      }, {}),
      relations: ['user'],
    });
    return entities;
    // return  entities.map((rating) => RatingMapper.toDomain(rating));
  }

  async create(data: Rating) {
    const persistenceModel = RatingMapper.toPersistence(data);
    
    const createdRating = await this.ratingRepository.save(persistenceModel);
    return RatingMapper.toDomain(createdRating);
  }

  async softDelete(id: string): Promise<void> {
    await this.ratingRepository.softDelete(id);
  }
}
