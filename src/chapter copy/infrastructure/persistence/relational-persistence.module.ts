import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';
import { chapterRepository } from '../lesson.repository';
import { ChapterEntity } from './relational/entities/lesson.entity';
import { coursesRelationalRepository } from 'src/courses/infrastructure/persistence/relational/repositories/course.repository';
import { chapterRelationalRepository } from './relational/repositories/lesson.repository';
import { CategoryRepository } from 'src/category/infrastructure/persistence/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  providers: [
    {
      provide: chapterRepository,
      useClass: chapterRelationalRepository,
    },
  ],
  exports: [chapterRepository],
})
export class RelationalchapterPersistenceModule {}
