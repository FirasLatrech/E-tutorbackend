import { Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from 'src/utils/types/nullable.type';

import { LanguageRepository } from './infrastructure/persistence/Language.repository';
import { SessionService } from 'src/session/session.service';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { language } from './domain/language';
import {
  FilterLanguageryDto,
  SortLanguageryDto,
} from './dto/query-language.dto';

@Injectable()
export class LanguageService {
  constructor(
    private readonly LanguageRepository: LanguageRepository,
    private sessionService: SessionService,
  ) {}

  findOne(options: EntityCondition<language>): Promise<NullableType<language>> {
    return this.LanguageRepository.findOne(options);
  }

  async create(
    data: Omit<language, 'id' | 'createdAt' | 'deletedAt'>,
    user_id: number,
  ): Promise<language> {
    const newData = { ...data, create_by: user_id };
    // const session = await this.sessionService.findOne({
    //   id: sessionId,
    // });
    // console.log(session);
    const result = this.LanguageRepository.create(newData);
    return result;
  }

  // async softDelete(id: language['id']): Promise<void> {
  //   await this.LanguageRepository.softDelete(id);
  // }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLanguageryDto | null;
    sortOptions?: SortLanguageryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<language[]> {
    return this.LanguageRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
