import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from '../utils/types/nullable.type';
// import { FiltercourseDto, SortcourseDto } from './dto/query-course.dto';

import { CreateCourseDTO } from './dto/create-course.dto';

import { CourseRepository } from './infrastructure/persistence/course.repository';
import { CourseEntity } from './infrastructure/persistence/relational/entities/course.entity';
import { LanguageService } from 'src/language/Language.service';
import { CategoryEntity } from 'src/category/infrastructure/persistence/relational/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { FilterCourseDto, SortCourseDto } from './dto/query-course.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Course } from './domain/course';
import { levelService } from 'src/level/level.service';
import { LevelEntity } from 'src/level/infrastructure/persistence/relational/entities/Level.entity';

@Injectable()
export class CoursesService {
  public get languageService(): LanguageService {
    return this._languageService;
  }
  public get levelService(): levelService {
    return this._levelService;
  }
  constructor(
    private readonly coursesRepository: CourseRepository,
    private readonly categoryService: CategoryService,
    private readonly userService: UsersService,
    private readonly _levelService: levelService,

    private readonly _languageService: LanguageService,
  ) {}

  async create(createCourseDto: CreateCourseDTO) {
    const course = new CourseEntity();
    const clonedPayload = {
      ...course,
      ...createCourseDto,
    };
    if (createCourseDto.course_category_id) {
      const isValidCategory = await this.categoryService.findOne({
        id: createCourseDto.course_category_id,
      });

      if (!isValidCategory) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              categoryId: 'categoryIdDoesNotExist',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.course_category = (await this.categoryService.findOne({
        id: createCourseDto.course_category_id,
      })) as CategoryEntity;
    }
    if (createCourseDto.course_sub_category_id) {
      const isValidCategory = await this.categoryService.findOne({
        id: createCourseDto.course_sub_category_id,
      });
      if (!isValidCategory) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              categoryId: 'sub category Id DoesNotExist',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.course_sub_category = (await this.categoryService.findOne({
        id: createCourseDto.course_sub_category_id,
      })) as CategoryEntity;
    }

    if (createCourseDto.course_language_id) {
      const isValidLanguage = await this.languageService.findOne({
        id: createCourseDto.course_language_id,
      });

      if (!isValidLanguage) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              languageId: 'Language ID DoesNotExist',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.course_language = (await this.languageService.findOne({
        id: createCourseDto.course_language_id,
      })) as LanguageEntity;
    }
    if (createCourseDto.subtitle_language_id) {
      const isValidLanguage = await this.languageService.findOne({
        id: createCourseDto.subtitle_language_id,
      });

      if (!isValidLanguage) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              LanguageId: 'Language ID DoesNotExist',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.subtitle_language = (await this.languageService.findOne({
        id: createCourseDto.subtitle_language_id,
      })) as LanguageEntity;
    }
    if (createCourseDto.course_instructor) {
      const users = await Promise.all(
        createCourseDto.course_instructor.map((id) => this.prelodUserById(id)),
      );

      clonedPayload.instructor = users as UserEntity[];
    }
    if (createCourseDto.course_level_id) {
      const isValidLevel = await this.levelService.findOne({
        id: createCourseDto.course_level_id,
      });

      if (!isValidLevel) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              levelId: 'level ID DoesNotExist',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.course_level = isValidLevel as LevelEntity;
    }

    if (createCourseDto.users) {
      const users = await Promise.all(
        createCourseDto.users.map((id) => this.prelodUserById(id)),
      );

      clonedPayload.user_courses = users as UserEntity[];
    }
    // console.log(createCourseDto.instructor);

    // const course = new courseEntity();

    return await this.coursesRepository.create(clonedPayload);
  }
  async findCoursesByIds(ids: string[]) {
    return await this.coursesRepository.findCoursesByIds(ids);
  }
  findManyWithPagination({
    filterOptions,
    sortOptions,
    search,

    paginationOptions,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Course[]> {
    return this.coursesRepository.findManyWithPagination({
      filterOptions,
      search,
      sortOptions,
      paginationOptions,
    });
  }

  async findOne(
    fields: EntityCondition<CourseEntity>,
  ): Promise<NullableType<CourseEntity>> {
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
