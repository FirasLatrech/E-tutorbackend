import { Lesson } from 'src/lesson/domain/lesson';

export class Chapter {
  id: string;

  title: string;

  lessons: Lesson[];
  rang: number;
  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
