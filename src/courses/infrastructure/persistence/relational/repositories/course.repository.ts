import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';

import { NullableType } from '../../../../../utils/types/nullable.type';

import { course } from '../../../../domain/course';

import { CourseMapper } from '../mappers/course.mapper';
import { CourseRepository } from '../../course.repository';
import { CategoryEntity } from 'src/category/infrastructure/persistence/relational/entities/category.entity';
import { courseEntity } from '../entities/course.entity';

@Injectable()
export class coursesRelationalRepository implements CourseRepository {
  constructor(
    @InjectRepository(courseEntity)
    private readonly coursesRepository: Repository<courseEntity>,

    // private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(data: courseEntity) {
    // const persistenceModel = CourseMapper.toPersistence(data);

    const newEntity = await this.coursesRepository.save(
      this.coursesRepository.create(data),
    );

    return CourseMapper.toDomain(newEntity);
  }

  // async findManyWithPagination({
  //   filterOptions,
  //   sortOptions,
  //   paginationOptions,
  // }: {
  //   filterOptions?: FiltercourseDto | null;
  //   sortOptions?: SortcourseDto[] | null;
  //   paginationOptions: IPaginationOptions;
  // }): Promise<course[]> {
  //   const where: FindOptionsWhere<courseEntity> = {};
  //   // if (filterOptions?.roles?.length) {
  //   //   where.role = filterOptions.roles.map((role) => ({
  //   //     id: role.id,
  //   //   }));
  //   // }

  //   const entities = await this.coursesRepository.find({
  //     skip: (paginationOptions.page - 1) * paginationOptions.limit,
  //     take: paginationOptions.limit,
  //     where: where,
  //     order: sortOptions?.reduce(
  //       (accumulator, sort) => ({
  //         ...accumulator,
  //         [sort.orderBy]: sort.order,
  //       }),
  //       {},
  //     ),
  //   });

  //   return entities.map((course) => CourseMapper.toDomain(course));
  // }

  async findOne(
    fields: EntityCondition<course>,
  ): Promise<NullableType<courseEntity>> {
    const entity = await this.coursesRepository.findOne({
      where: fields as FindOptionsWhere<courseEntity>,
      relations: ['course_category', 'course_sub_category', 'course_language'],
    });
    return entity;
    // return entity ? CourseMapper.toDomain(entity) : null;
  }

  // async update(id: course['id'], payload: Partial<course>): Promise<course> {
  //   const entity = await this.coursesRepository.findOne({
  //     where: { id: Number(id) },
  //   });

  //   if (!entity) {
  //     throw new Error('course not found');
  //   }

  //   const updatedEntity = await this.coursesRepository.save(
  //     this.coursesRepository.create(
  //       CourseMapper.toPersistence({
  //         ...CourseMapper.toDomain(entity),
  //         ...payload,
  //       }),
  //     ),
  //   );

  //   return CourseMapper.toDomain(updatedEntity);
  // }

  // async softDelete(id: course['id']): Promise<void> {
  //   await this.coursesRepository.softDelete(id);
  // }
}
