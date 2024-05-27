import { NullableType } from 'src/utils/types/nullable.type';

import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FilterNotificationDto, SortNotificationDto } from '../dto/query-notification.dto';
import { Notification } from '../domain/notification';



export abstract class NotificationRepository {
  abstract create(data: Omit<Notification, 'id'>): Promise<Notification>;

  abstract findManyNotificationOfCourseWithPagination({

    sortOptions,
    search,
    paginationOptions,
  }: {
    chapter_id?: string;
    sortOptions?: SortNotificationDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Notification[]>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
  }: {
    filterOptions?: FilterNotificationDto | null;
    sortOptions?: SortNotificationDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Notification[]>;

  abstract findOne(
    fields: EntityCondition<Notification>,
  ): Promise<NullableType<Notification | null>>;

  /*abstract update(
     id: Lesson['id'],
     payload: UpdateLessonDto,
   ): Promise<Lesson | null>*/

  abstract softDelete(id: Notification['id']): Promise<void>;
}
