import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationRelationalRepository } from './relational/repositories/notification.repository';
import { NotificationRepository } from '../lesson.repository';
import { NotificationEntity } from './relational/entities/notification.entity';


@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [
    {
      provide: NotificationRepository,
      useClass: NotificationRelationalRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class RelationalNotificationPersistenceModule {}
