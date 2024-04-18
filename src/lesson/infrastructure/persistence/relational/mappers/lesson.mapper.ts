import { ChapterMapper } from 'src/chapter/infrastructure/persistence/relational/mappers/chapter.mapper';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';
import { Lesson } from 'src/lesson/domain/lesson';
import { LessonEntity } from 'src/lesson/infrastructure/persistence/relational/entities/lesson.entity';

export class LessonMapper {
  static toDomain(raw: LessonEntity): Lesson {
    const lesson = new Lesson();
    lesson.id = raw.id;
    lesson.title = raw.title;
    lesson.description = raw.description;
    if (raw.chapter) {
      lesson.chapter = ChapterMapper.toDomain(raw.chapter);
    }
    lesson.progress = raw.progress;
    lesson.isCompleted = raw.isCompleted;
    lesson.Captions = raw.Captions;
    lesson.durationInSeconds = raw.durationInSeconds;
    lesson.LectureNotes = raw.LectureNotes;
    lesson.attachmentFile = raw.attachmentFile; // Assuming FileMapper is used for FileEntity
    lesson.VideoUrl = raw.VideoUrl; // Assuming FileMapper is used for FileEntity
    lesson.createdAt = raw.createdAt;
    lesson.updatedAt = raw.updatedAt;
    lesson.deletedAt = raw.deletedAt;
    return lesson;
  }

  static toPersistence(lesson: Lesson): LessonEntity {
    const lessonEntity = new LessonEntity();
    lessonEntity.id = lesson.id;
    lessonEntity.title = lesson.title;
    lessonEntity.description = lesson.description;
    if (lesson.chapter) {
      lessonEntity.chapter = ChapterMapper.toPersistence(lesson.chapter);
    }
    lessonEntity.progress = lesson.progress;
    lessonEntity.isCompleted = lesson.isCompleted;
    lessonEntity.Captions = lesson.Captions;
    lessonEntity.durationInSeconds = lesson.durationInSeconds;
    lessonEntity.LectureNotes = lesson.LectureNotes;
    if (lesson.attachmentFile) {
      lessonEntity.attachmentFile = FileMapper.toPersistence(
        lesson.attachmentFile,
      );
    }
    if (lesson.VideoUrl) {
      lessonEntity.VideoUrl = FileMapper.toPersistence(lesson.VideoUrl);
    }
    lessonEntity.createdAt = lesson.createdAt;
    lessonEntity.updatedAt = lesson.updatedAt;
    lessonEntity.deletedAt = lesson.deletedAt;
    return lessonEntity;
  }
}
