import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

import { User } from 'src/users/domain/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { LanguageMapper } from '../mappers/Language.mapper';

import { LanguageEntity } from '../entities/Language.entity';
import { LanguageRepository } from '../../Language.repository';

import { IPaginationOptions } from 'src/utils/types/pagination-options';

import {
  FilterLanguageryDto,
  SortLanguageryDto,
} from 'src/Language/dto/query-Language.dto';
import { language } from 'src/Language/domain/Language';

@Injectable()
export class LanguageRelationalRepository implements LanguageRepository {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly LanguageRepository: Repository<LanguageEntity>,
  ) {}

  async findOne(
    options: EntityCondition<language>,
  ): Promise<NullableType<language>> {
    const entity = await this.LanguageRepository.findOne({
      where: options as FindOptionsWhere<LanguageEntity>,
    });

    return entity ? LanguageMapper.toDomain(entity) : null;
  }
  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLanguageryDto | null;
    sortOptions?: SortLanguageryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<language[]> {
    const where: FindOptionsWhere<LanguageEntity> = {};

    if (filterOptions) {
      Object.assign(where, filterOptions);
    }

    const entities = await this.LanguageRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce((accumulator, sort) => {
        accumulator[sort.orderBy] = sort.order;
        return accumulator;
      }, {}),
    });

    return entities.map((Language) => LanguageMapper.toDomain(Language));
  }
  async create(data: language): Promise<language> {
    const persistenceModel = LanguageMapper.toPersistence(data);

    return this.LanguageRepository.save(
      this.LanguageRepository.create(persistenceModel),
    );
  }

  // async softDelete(id: number): Promise<void> {
  //   await this.LanguageRepository.softDelete({
  //     id,
  //   });
  // }
}
