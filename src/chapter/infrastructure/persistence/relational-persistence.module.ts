import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { chapterRepository } from '../chapter.repository';
import { ChapterEntity } from './relational/entities/chapter.entity';

import { chapterRelationalRepository } from './relational/repositories/chapter.repository';

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
