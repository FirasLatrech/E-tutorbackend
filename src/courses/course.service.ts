import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

import { NullableType } from '../utils/types/nullable.type';
// import { FiltercourseDto, SortcourseDto } from './dto/query-course.dto';

import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { course } from './domain/course';
import { StatusEnum } from 'src/status/status.enum';
import { RoleEnum } from 'src/roles/roles.enum';
import { FilesService } from 'src/files/files.service';
import bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CategoryEntity } from 'src/category/infrastructure/persistence/relational/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/crearte-category.dto';
import { CourseRepository } from './infrastructure/persistence/course.repository';
import { courseEntity } from './infrastructure/persistence/relational/entities/course.entity';
import { LanguageService } from 'src/language/Language.service';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';

@Injectable()
export class coursesService {
  constructor(
    private readonly coursesRepository: CourseRepository,
    // private readonly languageService: LanguageService,
    private readonly categoryService: CategoryService,
    private readonly languageService: LanguageService,
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
