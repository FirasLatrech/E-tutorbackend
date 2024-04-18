import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Chapter } from 'src/chapter/domain/chapter';
import { LessonMapper } from '../mappers/lesson.mapper';
import { LessonEntity } from '../entities/lesson.entity';
import { Lesson } from 'src/lesson/domain/lesson';
import { LessonRepository } from 'src/lesson/infrastructure/lesson.repository';

@Injectable()
export class lessonRelationalRepository implements LessonRepository {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  async create(data: Lesson) {
    const persistenceModel = LessonMapper.toPersistence(data);
    const newEntity = await this.lessonRepository.save(
      this.lessonRepository.create(persistenceModel),
    );
    return LessonMapper.toDomain(newEntity);
  }

  async findManyLessonOfChapterWithPagination({
    chapter_id,
    search,
    paginationOptions,
  }: {
    chapter_id?: string;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Lesson[]> {
    const entities = await this.lessonRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        title: Like(`%${search}%`),
        chapter: { id: chapter_id },
      },
      /*   order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.order]: sort.order,
        }),
        {},
      ),*/

      relations: [],
    });

    return entities.map((lesson) => LessonMapper.toDomain(lesson));
  }

  async findManyWithPagination({
    search,
    paginationOptions,
  }: {
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Lesson[]> {
    const entities = await this.lessonRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        title: Like(`%${search}%`),
        ...{},
      },
      /*   order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.order]: sort.order,
        }),
        {},
      ),*/

      relations: [],
    });

    return entities.map((lesson) => LessonMapper.toDomain(lesson));
  }

  async findOne(fields: EntityCondition<Lesson>): Promise<Lesson | null> {
    const entity = await this.lessonRepository.findOne({
      where: fields as FindOptionsWhere<LessonEntity>,
      relations: ['chapter'],
    });
    return entity ? LessonMapper.toDomain(entity) : null;
  }

  /* async update(id: Chapter['id'], payload: UpdatechapterDto): Promise<Chapter | null> {
     const entity = await this.lessonRepository.findOne({
       where: { id },
     })
     if (!entity) {
       throw new NotFoundException('chapter not found');
     }
     const updatedEntity = await this.lessonRepository.preload(
        ChapterMapper.toPersistence({
          id,
           ...ChapterMapper.toDomain(entity),
           ...payload,
         }),
       )
     
     return updatedEntity?ChapterMapper.toDomain(updatedEntity) : null;
}
*/
  async softDelete(id: Chapter['id']): Promise<void> {
    await this.lessonRepository.softDelete(id);
  }
}
