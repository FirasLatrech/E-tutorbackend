import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Chapter } from 'src/chapter/domain/chapter';
import { NotificationRepository } from 'src/notifications/infrastructure/lesson.repository';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationMapper } from '../mappers/notification.mapper';
import { Notification } from '../../../../domain/notification';
import { SortNotificationDto } from 'src/notifications/dto/query-notification.dto';

@Injectable()
export class NotificationRelationalRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly lessonRepository: Repository<NotificationEntity>,
  ) {}

  async create(data: Notification) {
    const persistenceModel = NotificationMapper.toPersistence(data);
    const newEntity = await this.lessonRepository.save(
      this.lessonRepository.create(persistenceModel),
    );
    return NotificationMapper.toDomain(newEntity);
  }

  async findManyNotificationOfCourseWithPagination({
    sortOptions,
    search,
    paginationOptions,
  }: {
    sortOptions?: SortNotificationDto[] | null;
    search: string;
    paginationOptions: IPaginationOptions;
  }): Promise<Notification[]>{
    const entities = await this.lessonRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
      },
         order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.order]: sort.order,
        }),
        {},
      ),

      relations: [],
    });

    return entities.map((Notification) => NotificationMapper.toDomain(Notification));
  }

  async findManyWithPagination({
    search,
    sortOptions,
    paginationOptions,
  }: {
    search: string;
    sortOptions?: SortNotificationDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Notification[]> {
    const entities = await this.lessonRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
      },
        order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),

      relations: [],
    });

    return entities.map((Notification) => NotificationMapper.toDomain(Notification));
  }

  async findOne(fields: EntityCondition<Notification>): Promise<Notification | null> {
    const entity = await this.lessonRepository.findOne({
      where: fields as FindOptionsWhere<NotificationEntity>,
      relations: ['course'],
    });
    return entity ? NotificationMapper.toDomain(entity) : null;
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
  async softDelete(id: Notification['id']): Promise<void> {
    await this.lessonRepository.softDelete(id);
  }
}
