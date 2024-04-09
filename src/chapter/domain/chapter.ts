import { LessonEntity } from 'src/chapter copy/infrastructure/persistence/relational/entities/lesson.entity';

export class Chapter {
  id: string;

  title: string;

  lessons: LessonEntity[];

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
