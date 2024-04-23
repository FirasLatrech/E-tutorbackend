import { Chapter } from 'src/chapter/domain/chapter';
import { FileType } from 'src/files/domain/file';

export class Lesson {
  id: string;
  title: string;
  Description: string | null;
  chapter: Chapter;
  progress: number;
  isCompleted: boolean;
  Captions: string | null;
  durationInSeconds: number;
  Notes: string | null;
  attachmentFile: FileType;
  Video: FileType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
