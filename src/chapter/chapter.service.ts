import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from '../utils/types/nullable.type';

import { UsersService } from 'src/users/users.service';

import { FilterChapterDto, SortChapterDto } from './dto/query-chapter.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ChapterEntity } from './infrastructure/persistence/relational/entities/chapter.entity';
import { Chapter } from './domain/chapter';
import { chapterRepository as ChapterRepository } from './infrastructure/chapter.repository';

@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterRepository: ChapterRepository,
    private readonly userService: UsersService,
  ) {}

  // async create(CreateChapterDto: CreateChapterDto) {
  //   //add creation lesson
  //   return await this.chapterRepository.create({...chapter,...CreateChapterDto});
  // }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    search,

    paginationOptions,
  }: {
    filterOptions?: FilterChapterDto | null;
    sortOptions?: SortChapterDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Chapter[]> {

    return this.chapterRepository.findManyWithPagination({
      filterOptions,
      search,
      sortOptions,
      paginationOptions,
    });
  }

  async findOne(
    fields: EntityCondition<ChapterEntity>,
  ): Promise<NullableType<ChapterEntity>> {
    const result = this.chapterRepository.findOne(fields);

    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.chapterRepository.findOne(fields);
  }

  /* async update(
     id: Chapter['id'],
     payload: UpdatechapterDto,
   ): Promise<Chapter | null> {
     const clonedPayload = { ...payload }
     return  this.chapterRepository.update(id, clonedPayload);
   }*/

  async softDelete(id: Chapter['id']): Promise<void> {
    await this.chapterRepository.softDelete(id);
  }

  private async prelodUserById(id: string) {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            userId: 'User ID DoesNotExist',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }
}
