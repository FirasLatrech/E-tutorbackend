import { ChapterMapper } from 'src/chapter/infrastructure/persistence/relational/mappers/chapter.mapper';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';
import { Lesson } from 'src/lesson/domain/lesson';
import { LessonEntity } from 'src/lesson/infrastructure/persistence/relational/entities/lesson.entity';

export class LessonMapper {
  static toDomain(raw: LessonEntity): Lesson {
    const lesson = new Lesson();
    lesson.id = raw.id;
    lesson.title = raw.title;
    lesson.Description = raw.Description;
    if (raw.chapter) {
      lesson.chapter = ChapterMapper.toDomain(raw.chapter);
    }
    lesson.progress = raw.progress;
    lesson.isCompleted = raw.isCompleted;
    lesson.Captions = raw.Captions;
    lesson.durationInSeconds = raw.durationInSeconds;
    lesson.Notes = raw.Notes;
    lesson.attachmentFile = raw.attachmentFile; // Assuming FileMapper is used for FileEntity
    lesson.Video = raw.Video; // Assuming FileMapper is used for FileEntity
    lesson.createdAt = raw.createdAt;
    lesson.updatedAt = raw.updatedAt;
    lesson.deletedAt = raw.deletedAt;
    return lesson;
  }

  static toPersistence(lesson: Lesson): LessonEntity {
    const lessonEntity = new LessonEntity();
    lessonEntity.id = lesson.id;
    lessonEntity.title = lesson.title;
    lessonEntity.Description = lesson.Description;
    if (lesson.chapter) {
      lessonEntity.chapter = ChapterMapper.toPersistence(lesson.chapter);
    }
    lessonEntity.progress = lesson.progress;
    lessonEntity.rang = lesson.rang;
    lessonEntity.isCompleted = lesson.isCompleted;
    lessonEntity.Captions = lesson.Captions;
    lessonEntity.durationInSeconds = lesson.durationInSeconds;
    lessonEntity.Notes = lesson.Notes;
    if (lesson.attachmentFile) {
      lessonEntity.attachmentFile = FileMapper.toPersistence(
        lesson.attachmentFile,
      );
    }
    if (lesson.Video) {
      lessonEntity.Video = FileMapper.toPersistence(lesson.Video);
    }
    lessonEntity.createdAt = lesson.createdAt;
    lessonEntity.updatedAt = lesson.updatedAt;
    lessonEntity.deletedAt = lesson.deletedAt;
    return lessonEntity;
  }
}
