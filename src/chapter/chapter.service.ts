import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from '../utils/types/nullable.type';

import { UsersService } from 'src/users/users.service';

import { FilterChapterDto, SortChapterDto } from './dto/query-chapter.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ChapterEntity } from './infrastructure/persistence/relational/entities/chapter.entity';
import { Chapter } from './domain/chapter';
import { chapterRepository as ChapterRepository } from './infrastructure/chapter.repository';
import { CreateChapterDto } from './dto/create-chapter.sto';
import { lessonService } from 'src/lesson/lesson.service';
import { LessonMapper } from 'src/lesson/infrastructure/persistence/relational/mappers/lesson.mapper';

@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterRepository: ChapterRepository,
    private readonly userService: UsersService,
    private readonly lessonService: lessonService,
  ) {}

  async create(CreateChapterDto: CreateChapterDto) {
    const lessonsEntities =
      CreateChapterDto.lessons &&
      (await Promise.all(
        CreateChapterDto.lessons.map(async (lesson) => {
          const CreatedLesson = await this.lessonService.create(lesson);

          if (!CreatedLesson) {
            throw new Error(`Lesson with ID ${CreatedLesson} does not exist`);
          }

          return LessonMapper.toPersistence(CreatedLesson);
        }),
      ));

    // Create a new ChapterEntity instance

    // Save the new ChapterEntity instance
    return await this.chapterRepository.create({
      ...CreateChapterDto,
      lessons: lessonsEntities,
    });
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
  ): Promise<NullableType<Chapter>> {
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
