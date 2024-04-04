import { Module } from '@nestjs/common';

import { coursesRelationalRepository } from './repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseRepository } from '../course.repository';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, LanguageEntity])],
  providers: [
    {
      provide: CourseRepository,
      useClass: coursesRelationalRepository,
    },
  ],
  exports: [CourseRepository],
})
export class RelationalcoursePersistenceModule {}
