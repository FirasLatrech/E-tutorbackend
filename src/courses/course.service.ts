import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from '../utils/types/nullable.type';
// import { FiltercourseDto, SortcourseDto } from './dto/query-course.dto';

import { CreateCourseDTO } from './dto/create-course.dto';

import { CourseRepository } from './infrastructure/persistence/course.repository';
import { courseEntity } from './infrastructure/persistence/relational/entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CourseRepository,
    // private readonly languageService: LanguageService,
  ) {}

  async create(createCourseDto: CreateCourseDTO) {
    const course = new courseEntity();
    const clonedPayload = {
      ...course,
      ...createCourseDto,
    };
    // if (createCourseDto.course_category_id) {
    //   const isValidCategory = await this.categoryService.findOne({
    //     id: createCourseDto.course_category_id,
    //   });

    //   if (!isValidCategory) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.UNPROCESSABLE_ENTITY,
    //         errors: {
    //           categoryId: 'categoryIdDoesNotExist',
    //         },
    //       },
    //       HttpStatus.UNPROCESSABLE_ENTITY,
    //     );
    //   }
    //   clonedPayload.course_category = (await this.categoryService.findOne({
    //     id: createCourseDto.course_category_id,
    //   })) as CategoryEntity;
    // }
    // if (createCourseDto.course_sub_category_id) {
    //   const isValidCategory = await this.categoryService.findOne({
    //     id: createCourseDto.course_sub_category_id,
    //   });
    //   if (!isValidCategory) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.UNPROCESSABLE_ENTITY,
    //         errors: {
    //           categoryId: 'sub category Id DoesNotExist',
    //         },
    //       },
    //       HttpStatus.UNPROCESSABLE_ENTITY,
    //     );
    //   }
    //   clonedPayload.course_sub_category = (await this.categoryService.findOne({
    //     id: createCourseDto.course_sub_category_id,
    //   })) as CategoryEntity;
    // }

    // if (createCourseDto.course_language_id) {
    //   const isValidCategory = await this.languageService.findOne({
    //     id: createCourseDto.course_language_id,
    //   });

    //   if (!isValidCategory) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.UNPROCESSABLE_ENTITY,
    //         errors: {
    //           categoryId: 'Language ID DoesNotExist',
    //         },
    //       },
    //       HttpStatus.UNPROCESSABLE_ENTITY,
    //     );
    //   }
    //   clonedPayload.course_language = (await this.languageService.findOne({
    //     id: createCourseDto.course_language_id,
    //   })) as LanguageEntity;
    // }
    // if (createCourseDto.subtitle_language_id) {
    //   const isValidCategory = await this.languageService.findOne({
    //     id: createCourseDto.subtitle_language_id,
    //   });

    //   if (!isValidCategory) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.UNPROCESSABLE_ENTITY,
    //         errors: {
    //           LanguageId: 'Language ID DoesNotExist',
    //         },
    //       },
    //       HttpStatus.UNPROCESSABLE_ENTITY,
    //     );
    //   }
    //   clonedPayload.subtitle_language = (await this.languageService.findOne({
    //     id: createCourseDto.subtitle_language_id,
    //   })) as LanguageEntity;
    // }

    // const course = new courseEntity();

    return await this.coursesRepository.create(clonedPayload);
  }

  // findManyWithPagination({
  //   filterOptions,
  //   sortOptions,
  //   paginationOptions,
  // }: {
  //   filterOptions?: FiltercourseDto | null;
  //   sortOptions?: SortcourseDto[] | null;
  //   paginationOptions: IPaginationOptions;
  // }): Promise<course[]> {
  //   return this.coursesRepository.findManyWithPagination({
  //     filterOptions,
  //     sortOptions,
  //     paginationOptions,
  //   });
  // }

  async findOne(
    fields: EntityCondition<courseEntity>,
  ): Promise<NullableType<courseEntity>> {
    const result = this.coursesRepository.findOne(fields);

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

    return this.coursesRepository.findOne(fields);
  }

  // async update(
  //   id: course['id'],
  //   payload: DeepPartial<course>,
  // ): Promise<course | null> {
  //   const clonedPayload = { ...payload };

  //   return this.coursesRepository.update(id, clonedPayload);
  // }

  // async softDelete(id: course['id']): Promise<void> {
  //   await this.coursesRepository.softDelete(id);
  // }
}
