import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { RelationalNotificationPersistenceModule } from './infrastructure/persistence/relational-persistence.module';
import { coursesModule } from 'src/courses/course.module';
import { UsersModule } from 'src/users/users.module';
import { NotificationsController } from './notifications.controller';

@Module({
  imports:[
    RelationalNotificationPersistenceModule,
    coursesModule,
    UsersModule
  ],
  providers: [NotificationService],
  controllers: [NotificationsController],
  exports:[NotificationService, ]
})
export class NotificationsModule {}
