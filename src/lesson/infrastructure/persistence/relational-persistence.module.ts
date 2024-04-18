import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { lessonRelationalRepository } from './relational/repositories/lesson.repository';
import { LessonRepository } from '../lesson.repository';
import { LessonEntity } from './relational/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity])],
  providers: [
    {
      provide: LessonRepository,
      useClass: lessonRelationalRepository,
    },
  ],
  exports: [LessonRepository],
})
export class RelationallessonPersistenceModule {}
