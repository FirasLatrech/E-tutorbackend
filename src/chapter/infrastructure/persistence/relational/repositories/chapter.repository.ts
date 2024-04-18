import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { chapterRepository } from 'src/chapter/infrastructure/chapter.repository';
import { ChapterEntity } from '../entities/chapter.entity';
import {
  FilterChapterDto,
  SortChapterDto,
} from 'src/chapter/dto/query-chapter.dto';
import { Chapter } from 'src/chapter/domain/chapter';
import { ChapterMapper } from '../mappers/chapter.mapper';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class chapterRelationalRepository implements chapterRepository {
  constructor(
    @InjectRepository(ChapterEntity)
    private readonly chapterRepository: Repository<ChapterEntity>,
  ) {}

  async create(data: Chapter) {
    const persistenceModel = ChapterMapper.toPersistence(data);
    const newEntity = await this.chapterRepository.save(
      this.chapterRepository.create(persistenceModel),
    );
    return ChapterMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    search,
    paginationOptions,
  }: {
    filterOptions: FilterChapterDto;
    sortOptions?: SortChapterDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Chapter[]> {
    const entities = await this.chapterRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        title: Like(`%${search}%`),
      },
      /* order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),*/

      relations: [],
    });

    return entities.map((chapter) => ChapterMapper.toDomain(chapter));
  }

  async findOne(
    fields: EntityCondition<ChapterEntity>,
  ): Promise<NullableType<Chapter | null>> {
    const entity = await this.chapterRepository.findOne({
      where: fields as FindOptionsWhere<ChapterEntity>,
      relations: ['lessons'],
    });
    return entity ? ChapterMapper.toDomain(entity) : null;
  }

  /* async update(id: Chapter['id'], payload: UpdatechapterDto): Promise<Chapter | null> {
     const entity = await this.chapterRepository.findOne({
       where: { id },
     })
     if (!entity) {
       throw new NotFoundException('chapter not found');
     }
     const updatedEntity = await this.chapterRepository.preload(
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
    await this.chapterRepository.softDelete(id);
  }
}
