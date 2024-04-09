// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { FindOptionsWhere, Like, Repository } from 'typeorm';

// import { NullableType } from '../../../../../utils/types/nullable.type';

// import { EntityCondition } from 'src/utils/types/entity-condition.type';
// import { CategoryMapper } from '../mappers/category.mapper';
// import { Category } from 'src/category/domain/category';
// import { CategoryEntity } from '../entities/category.entity';
// import { CategoryRepository } from '../../category.repository';

// import { IPaginationOptions } from 'src/utils/types/pagination-options';
// import {
//   FilterCategoryDto,
//   SortCategoryDto,
// } from 'src/category/dto/query-category.dto';
// import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';

// import { SortCourseDto } from 'src/courses/dto/query-course.dto';
// import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
// import { EntityAuditLog } from 'src/audit/infrastructure/persistence/relational/entities/entity-audit-log.entity';

// @Injectable()
// export class CategoryRelationalRepository implements CategoryRepository {
//   constructor(
//     @InjectRepository(CategoryEntity)
//     private readonly CategoryRepository: Repository<CategoryEntity>,
//     @InjectRepository(CourseEntity)
//     private readonly courseRepository: Repository<CourseEntity>,
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//     @InjectRepository(EntityAuditLog)
//     private auditLogRepository: Repository<EntityAuditLog>,
//   ) {}

//   async findOne(
//     options: EntityCondition<Category>,
//   ): Promise<NullableType<Category>> {
//     const entity = await this.CategoryRepository.findOne({
//       where: options as FindOptionsWhere<CategoryEntity>,
//       relations: ['courses', 'sub_courses_category'],
//     });
//     console.log(entity);

//     return entity ? CategoryMapper.toDomain(entity) : null;
//   }
//   async getAllCourseOfCategory({
//     sortOptions,
//     paginationOptions,
//     search,
//     categor_id,
//   }: {
//     // filterOptions?: FilterCourseDto | null;
//     sortOptions?: SortCourseDto[] | null;
//     paginationOptions: IPaginationOptions;
//     search: string | null;
//     categor_id: string;
//   }) {
//     const result = await this.courseRepository.find({
//       skip: (paginationOptions.page - 1) * paginationOptions.limit,
//       take: paginationOptions.limit,

//       order: sortOptions?.reduce((accumulator, sort) => {
//         accumulator[sort.orderBy] = sort.order;
//         return accumulator;
//       }, {}),
//       where: {
//         course_category: {
//           id: categor_id,
//         },

//         title: Like(`%${search}%`),
//       },
//       select: {
//         course_category: {
//           id: true,
//           name: true,
//         },
//       },

//       relations: ['course_category'],
//     });
//     return result;
//   }
//   async getAllInstructorOfCategory({
//     sortOptions,
//     paginationOptions,

//     categor_id,
//   }: {
//     // filterOptions?: FilterCourseDto | null;
//     sortOptions?: SortCourseDto[] | null;
//     paginationOptions: IPaginationOptions;
//     // search: string | null;
//     categor_id: string;
//   }) {
//     const result = await this.userRepository.find({
//       skip: (paginationOptions.page - 1) * paginationOptions.limit,
//       take: paginationOptions.limit,

//       order: sortOptions?.reduce((accumulator, sort) => {
//         accumulator[sort.orderBy] = sort.order;
//         return accumulator;
//       }, {}),
//       where: {
//         my_courses: {
//           course_category: {
//             id: categor_id,
//           },
//         },
//         role: {
//           id: 3,
//         },

//         // title: Like(`%${search}%`),
//       },
//       // select: {
//       //   course_category: {
//       //     id: true,
//       //     name: true,
//       //   },
//       // },
//     });

//     return result;
//   }
//   async findManyWithPagination({
//     filterOptions,
//     sortOptions,
//     paginationOptions,
//   }: {
//     filterOptions?: FilterCategoryDto | null;
//     sortOptions?: SortCategoryDto[] | null;
//     paginationOptions: IPaginationOptions;
//   }): Promise<Category[]> {
//     const where: FindOptionsWhere<CategoryEntity> = {};

//     if (filterOptions) {
//       Object.assign(where, filterOptions);
//     }

//     const entities = await this.CategoryRepository.find({
//       skip: (paginationOptions.page - 1) * paginationOptions.limit,
//       take: paginationOptions.limit,
//       where: where,
//       order: sortOptions?.reduce((accumulator, sort) => {
//         accumulator[sort.orderBy] = sort.order;
//         return accumulator;
//       }, {}),
//       relations: ['courses', 'sub_courses_category'],
//       select: {
//         courses: { id: true },
//         sub_courses_category: { id: true },
//       },
//     });

//     return entities.map((category) => CategoryMapper.toDomain(category));
//   }
//   async getGategoryDetails(category_id: string) {
//     return this.CategoryRepository.findOne({ where: { id: category_id } });
//   }
//   async create(data: Category): Promise<Category> {
//     const persistenceModel = CategoryMapper.toPersistence(data);

//     const result = await this.CategoryRepository.save(
//       this.CategoryRepository.create(persistenceModel),
//     );
//     const auditLog = new EntityAuditLog();
//     auditLog.entityName = 'Category'; // Assuming entity name is 'Category'
//     auditLog.action = 'CREATE';
//     auditLog.entityId = result.id as string; // Assuming entity has an id property
//     auditLog.timestamp = new Date();
//     auditLog.userId = result.create_by; // Assuming user id is available in the request

//     await this.auditLogRepository.save(auditLog);
//     return result;
//   }

//   async softDelete(id: string): Promise<void> {
//     await this.CategoryRepository.softDelete({
//       id,
//     });
//   }
// }
