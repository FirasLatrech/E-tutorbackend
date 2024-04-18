import { Chapter } from 'src/chapter/domain/chapter';
import { ChapterEntity } from '../entities/chapter.entity';
import { LessonMapper } from 'src/lesson/infrastructure/persistence/relational/mappers/lesson.mapper';

export class ChapterMapper {
  static toDomain(raw: ChapterEntity): Chapter {
    const chapter = new Chapter();
    chapter.id = raw.id;
    chapter.title = raw.title;
    if (raw.lessons) {
      chapter.lessons = raw.lessons.map((lesson) =>
        LessonMapper.toDomain(lesson),
      );
    }
    chapter.createdAt = raw.createdAt;
    chapter.updatedAt = raw.updatedAt;
    chapter.deletedAt = raw.deletedAt;
    return chapter;
  }

  static toPersistence(chapter: Chapter): ChapterEntity {
    const chapterEntity = new ChapterEntity();
    chapterEntity.id = chapter.id;
    chapterEntity.title = chapter.title;
    chapterEntity.lessons = chapter.lessons?.map((lesson) =>
      LessonMapper.toPersistence(lesson),
    );
    chapterEntity.createdAt = chapter.createdAt;
    chapterEntity.updatedAt = chapter.updatedAt;
    chapterEntity.deletedAt = chapter.deletedAt;
    return chapterEntity;
  }
}
