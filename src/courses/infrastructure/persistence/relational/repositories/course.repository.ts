import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { FindOptionsWhere, Like, Repository } from 'typeorm';

import { NullableType } from '../../../../../utils/types/nullable.type';

import { CourseMapper } from '../mappers/course.mapper';
import { CourseRepository } from '../../course.repository';
import { CourseEntity } from '../entities/course.entity';
import { Course } from 'src/courses/domain/course';
import {
  // FilterCourseDto,
  SortCourseDto,
} from 'src/courses/dto/query-course.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { UpdateCourseDTO } from 'src/courses/dto/update-course-dto';

@Injectable()
export class coursesRelationalRepository implements CourseRepository {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,

    // private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {}
  async findCoursesByIds(ids: string[]) {
    const courses = (await Promise.all(
      ids.map((id) =>
        this.coursesRepository.findOne({
          where: { id },
          relations: [
            'instructor',
            'course_category',
            'course_level',
            'instructor',
            'chapters',
          ],
        }),
      ),
    )) as CourseEntity[];

    return courses;
  }
  async create(data: CourseEntity) {
    const persistenceModel = CourseMapper.toPersistence(data);
    console.log(persistenceModel.course_topic)
    const newEntity = await this.coursesRepository.save(
      this.coursesRepository.create(persistenceModel),
    );

    return newEntity;
  }

  async findManyWithPagination({
    // filterOptions,
    sortOptions,
    search,
    paginationOptions,
  }: {
    // filterOptions;
    sortOptions?: SortCourseDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Course[]> {
    // const where: FindOptionsWhere<CourseEntity> = {};
    // if (filterOptions?.roles?.length) {
    //   where.role = filterOptions.roles.map((role) => ({
    //     id: role.id,
    //   }));
    // }

    const entities = await this.coursesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        title: Like(`%${search}%`),
      },
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),

      relations: ['course_category', 'course_level', 'instructor', 'chapters'],
    });

    return entities.map((course) => CourseMapper.toDomain(course));
  }

  async findOne(
    fields: EntityCondition<Course>,
  ): Promise<NullableType<CourseEntity>> {
    const entity = await this.coursesRepository.findOne({
      select: {
        
        course_category: {
          courses: false,
          id: true,
        },

        course_language: {
          id: true,
          language_courses: false,
          courses_sub_languages: false,
        },
        instructor: {
          username: true,
          firstName: true,
          lastName: true,
        },
        course_sub_category: {
          courses: false,
          name: true,
          id: true,
        },
        course_level: {
          id: true,
          name: true,
        },
      },
      relations: [
        'course_category',
        'course_sub_category',
        'subtitle_language',
        'course_language',
        'instructor',
        'course_level',
        'chapters',
      ],

      where: fields as FindOptionsWhere<CourseEntity>,
    });

    return entity;
    // return entity ? CourseMapper.toDomain(entity) : null;
  }

  async update(id: Course['id'], payload: UpdateCourseDTO): Promise<Course> {
    const entity = await this.coursesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('course not found');
    }

    const updatedEntity = await this.coursesRepository.save(
      this.coursesRepository.create(
        CourseMapper.toPersistence({
          ...CourseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CourseMapper.toDomain(updatedEntity);
  }

  // async softDelete(id: course['id']): Promise<void> {
  //   await this.coursesRepository.softDelete(id);
  // }
}
