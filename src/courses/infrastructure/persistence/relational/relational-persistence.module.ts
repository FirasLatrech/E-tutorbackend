import { Module } from '@nestjs/common';

import { coursesRelationalRepository } from './repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { courseEntity } from './entities/course.entity';
import { CourseRepository } from '../course.repository';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([courseEntity, LanguageEntity])],
  providers: [
    {
      provide: CourseRepository,
      useClass: coursesRelationalRepository,
    },
  ],
  exports: [CourseRepository],
})
export class RelationalcoursePersistenceModule {}
