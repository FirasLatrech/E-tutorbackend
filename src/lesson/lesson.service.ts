import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from '../utils/types/nullable.type';
import { UsersService } from 'src/users/users.service';

import { IPaginationOptions } from 'src/utils/types/pagination-options';

import { Chapter } from 'src/chapter/domain/chapter';
import { CreateLessonDto } from './dto/create-lesson.sto';
import { Lesson } from './domain/lesson';
import { LessonRepository } from './infrastructure/lesson.repository';
import { FilterLessonDto, SortLessonDto } from './dto/query-lesson.dto';

@Injectable()
export class lessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly userService: UsersService,
  ) {}

  async create(CreateChapterDto: CreateLessonDto) {
    const chapter = new Lesson();
    return await this.lessonRepository.create({
      ...chapter,
      ...CreateChapterDto,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    search,

    paginationOptions,
  }: {
    filterOptions?: FilterLessonDto | null;
    sortOptions?: SortLessonDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Lesson[]> {
    return this.lessonRepository.findManyWithPagination({
      filterOptions,
      search,
      sortOptions,
      paginationOptions,
    });
  }

  async findOne(
    fields: EntityCondition<Lesson>,
  ): Promise<NullableType<Lesson>> {
    const result = this.lessonRepository.findOne(fields);

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

    return this.lessonRepository.findOne(fields);
  }

  /* async update(
     id: Chapter['id'],
     payload: UpdatechapterDto,
   ): Promise<Chapter | null> {
     const clonedPayload = { ...payload }
     return  this.chapterRepository.update(id, clonedPayload);
   }*/

  async softDelete(id: Chapter['id']): Promise<void> {
    await this.lessonRepository.softDelete(id);
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

  async findManyLessonOfChapterWithPagination({
    chapter_id,
    sortOptions,
    search,
    paginationOptions,
  }: {
    chapter_id?: string;
    sortOptions?: SortLessonDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }) {
    return this.lessonRepository.findManyLessonOfChapterWithPagination({
      chapter_id,
      search,
      sortOptions,
      paginationOptions,
    });
  }
}
