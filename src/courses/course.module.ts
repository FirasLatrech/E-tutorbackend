import { Module } from '@nestjs/common';

import { FilesModule } from 'src/files/files.module';

import { RelationalcoursePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CoursesService } from './course.service';
import { coursesController } from './course.controller';

import { CategoryModule } from 'src/category/category.module';
import { LanguageModule } from 'src/language/language.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { LanguageEntity } from 'src/language/infrastructure/persistence/relational/entities/language.entity';
import { UsersModule } from 'src/users/users.module';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { LevelEntity } from 'src/level/infrastructure/persistence/relational/entities/level.entity';
import { LevelModule } from 'src/level/level.module';
import { chapterModule } from 'src/chapter/chapter.module';

const infrastructurePersistenceModule = RelationalcoursePersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    LevelModule,
    UsersModule,
    CategoryModule,
    LanguageModule,
    chapterModule,
    FilesModule
  ],
  controllers: [coursesController],
  providers: [CoursesService],
  exports: [CoursesService, infrastructurePersistenceModule],
})
export class coursesModule {}
