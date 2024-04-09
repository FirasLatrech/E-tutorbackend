import { Chapter } from "src/chapter/domain/chapter";
import { FileType } from "src/files/domain/file";

export class Lesson {
  id: string;
  title: string;
  description: string | null;
  chapter: Chapter;
  progress: number;
  isCompleted: boolean;
  captions: string | null;
  durationInSeconds: number;
  lectureNotes: string | null;
  attachmentFile: FileType;
  videoUrl: FileType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
