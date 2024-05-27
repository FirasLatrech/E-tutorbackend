import { Notification } from 'src/notifications/domain/notification';
import { NotificationEntity } from '../entities/notification.entity';
import { CourseMapper } from 'src/courses/infrastructure/persistence/relational/mappers/course.mapper';

export class NotificationMapper {
  static toDomain(raw: NotificationEntity): Notification {
    const notification = new Notification();
    notification.id = raw.id;
    notification.message = raw.message;
    notification.sentAt = raw.sentAt;
    notification.isRead = raw.isRead;
    notification.type = raw.type;
    notification.course = raw.course;
    notification.createdAt = raw.createdAt;
    notification.updatedAt = raw.updatedAt;
    notification.deletedAt = raw.deletedAt;
    return notification;
  }

  static toPersistence(notification: Notification): NotificationEntity {
    const notificationEntity = new NotificationEntity();
    notificationEntity.id = notification.id;
    notificationEntity.message = notification.message;
    notificationEntity.sentAt = notification.sentAt;
    notificationEntity.course = CourseMapper.toPersistence(notification.course);
    notificationEntity.isRead = notification.isRead;
    notificationEntity.type = notification.type;
    notification.course = notification.course;
    return notificationEntity;
  }
}
