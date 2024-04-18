import { Injectable } from '@nestjs/common';

import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from 'src/utils/types/nullable.type';

import { LevelRepository } from './infrastructure/persistence/level.repository';
import { SessionService } from 'src/session/session.service';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Level } from './domain/level';
import { FilterLevelryDto, SortLevelryDto } from './dto/query-level.dto';

@Injectable()
export class levelService {
  constructor(
    private readonly levelRepository: LevelRepository,
    private sessionService: SessionService,
  ) {}

  findOne(options: EntityCondition<Level>): Promise<NullableType<Level>> {
    return this.levelRepository.findOne(options);
  }

  async create(
    data: Omit<Level, 'id' | 'createdAt' | 'deletedAt'>,
    user_id: number,
  ): Promise<Level> {
    const newData = { ...data, create_by: user_id };
    // const session = await this.sessionService.findOne({
    //   id: sessionId,
    // });
    // console.log(session);
    const result = this.levelRepository.create(newData);
    return result;
  }

  // async softDelete(id: Level['id']): Promise<void> {
  //   await this.LevelRepository.softDelete(id);
  // }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLevelryDto | null;
    sortOptions?: SortLevelryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Level[]> {
    return this.levelRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
