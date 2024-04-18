import { Chapter } from 'src/chapter/domain/chapter';
import { FileType } from 'src/files/domain/file';

export class Lesson {
  id: string;
  title: string;
  description: string | null;
  chapter: Chapter;
  progress: number;
  isCompleted: boolean;
  Captions: string | null;
  durationInSeconds: number;
  LectureNotes: string | null;
  attachmentFile: FileType;
  VideoUrl: FileType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
