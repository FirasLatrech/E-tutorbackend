import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { NullableType } from '../utils/types/nullable.type';
import { UsersService } from 'src/users/users.service';

import { IPaginationOptions } from 'src/utils/types/pagination-options';

import { Chapter } from 'src/chapter/domain/chapter';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './domain/notification';
import { NotificationRepository } from './infrastructure/lesson.repository';
import {
  FilterNotificationDto,
  SortNotificationDto,
} from './dto/query-notification.dto';
import { CoursesService } from 'src/courses/course.service';
@Injectable()
export class NotificationService {
  constructor(
    private readonly NotificationRepository: NotificationRepository,
    private readonly CoursesService: CoursesService,
  ) {}

  async create(CreateNotificationDto: CreateNotificationDto) {
    const notification = new Notification();

    if (CreateNotificationDto.courseId) {
      const course = await this.CoursesService.findOne({
        id: CreateNotificationDto.courseId,
      });
      if (!course) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              status: 'courseNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      notification.course = course;
    }
    return await this.NotificationRepository.create({
      ...notification,
      ...CreateNotificationDto,
      createdAt: new Date(),
      course: notification.course
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    search,

    paginationOptions,
  }: {
    filterOptions?: FilterNotificationDto | null;
    sortOptions?: SortNotificationDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Notification[]> {
    return this.NotificationRepository.findManyWithPagination({
      filterOptions,
      search,
      sortOptions,
      paginationOptions,
    });
  }

  async findOne(
    fields: EntityCondition<Notification>,
  ): Promise<NullableType<Notification>> {
    const result = this.NotificationRepository.findOne(fields);

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

    return this.NotificationRepository.findOne(fields);
  }

  /* async update(
     id: Chapter['id'],
     payload: UpdatechapterDto,
   ): Promise<Chapter | null> {
     const clonedPayload = { ...payload }
     return  this.chapterRepository.update(id, clonedPayload);
   }*/

  // async softDelete(id: Chapter['id']): Promise<void> {
  // await this.NotificationRepository.softDelete(id);
  //}

  // private async prelodUserById(id: string) {
  //   const user = await this.userService.findOne({ id });
  //   if (!user) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           userId: 'User ID DoesNotExist',
  //         },
  //       },
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //
  //   return user;
  //}
}
