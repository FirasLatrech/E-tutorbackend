import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { chapterRelationalRepository } from './relational/repositories/lesson.repository';
import { ChapterEntity } from 'src/chapter/infrastructure/persistence/relational/entities/chapter.entity';
import { chapterRepository } from 'src/chapter/infrastructure/chapter.repository';

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
