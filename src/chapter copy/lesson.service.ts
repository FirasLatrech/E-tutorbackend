 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from '../utils/types/nullable.type';
import { LanguageService } from 'src/language/Language.service';
import { CategoryService } from 'src/category/category.service';
import { UsersService } from 'src/users/users.service';
import { levelService } from 'src/level/level.service';
import { CreateChapterDto } from './dto/create-lesson.sto';
import { FilterChapterDto, SortChapterDto } from './dto/query-lesson.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ChapterEntity } from './infrastructure/persistence/relational/entities/lesson.entity';
import { Chapter } from './domain/chapter';
import { chapterRepository } from './infrastructure/lesson.repository';
import { UpdatechapterDto } from './dto/update-lesson.dto';

@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterRepository: chapterRepository,
    private readonly userService: UsersService,
  ) {}

  async create(CreateChapterDto: CreateChapterDto) {
    const chapter = new ChapterEntity()
    return await this.chapterRepository.create({...chapter,...CreateChapterDto});
  }

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
    console.log(sortOptions);
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
