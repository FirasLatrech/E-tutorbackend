import { Module } from '@nestjs/common';

import { coursesRelationalRepository } from './repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseRepository } from '../course.repository';
import { LanguageEntity } from 'src/language/infrastructure/persistence/relational/entities/language.entity';
import { LevelEntity } from 'src/level/infrastructure/persistence/relational/entities/level.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      LanguageEntity,
      RoleEntity,
      LanguageEntity,
      UserEntity,
      LevelEntity,
    ]),
  ],
  providers: [
    {
      provide: CourseRepository,
      useClass: coursesRelationalRepository,
    }, 
  ],
  exports: [CourseRepository],
})
export class RelationalcoursePersistenceModule {}
