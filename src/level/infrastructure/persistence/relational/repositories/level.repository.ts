import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';

import {
  FilterLevelryDto,
  SortLevelryDto,
} from 'src/level/dto/query-level.dto';
import { Level } from 'src/level/domain/level';
import { LevelEntity } from '../entities/level.entity';
import { LevelRepository } from '../../level.repository';
import { LevelMapper } from '../mappers/level.mapper';

@Injectable()
export class LevelRelationalRepository implements LevelRepository {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly LevelRepository: Repository<LevelEntity>,
  ) {}

  async findOne(options: EntityCondition<Level>): Promise<NullableType<Level>> {
    const entity = await this.LevelRepository.findOne({
      where: options as FindOptionsWhere<LevelEntity>,
    });

    return entity ? LevelMapper.toDomain(entity) : null;
  }
  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLevelryDto | null;
    sortOptions?: SortLevelryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Level[]> {
    const where: FindOptionsWhere<LevelEntity> = {};

    if (filterOptions) {
      Object.assign(where, filterOptions);
    }

    const entities = await this.LevelRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce((accumulator, sort) => {
        accumulator[sort.orderBy] = sort.order;
        return accumulator;
      }, {}),
    });

    return entities.map((Level) => LevelMapper.toDomain(Level));
  }
  async create(data: Level): Promise<Level> {
    const persistenceModel = LevelMapper.toPersistence(data);

    return this.LevelRepository.save(
      this.LevelRepository.create(persistenceModel),
    );
  }

  // async softDelete(id: number): Promise<void> {
  //   await this.LevelRepository.softDelete({
  //     id,
  //   });
  // }
}
