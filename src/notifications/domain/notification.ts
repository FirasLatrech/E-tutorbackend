import { Course } from 'src/courses/domain/course';

export class Notification {
  id: string;
  message: string;
  sentAt: Date;
  isRead: boolean;
  type: string;
  course: Course; 
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
