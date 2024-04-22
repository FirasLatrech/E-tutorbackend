import { Module } from '@nestjs/common';

import { coursesRelationalRepository } from './repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseRepository } from '../course.repository';
import { LanguageEntity } from 'src/language/infrastructure/persistence/relational/entities/language.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, LanguageEntity, FileEntity])],
  providers: [
    {
      provide: CourseRepository,
      useClass: coursesRelationalRepository,
    }, 
  ],
  exports: [CourseRepository],
})
export class RelationalcoursePersistenceModule {}
