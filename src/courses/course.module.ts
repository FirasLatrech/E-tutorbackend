import { Module } from '@nestjs/common';

import { FilesModule } from 'src/files/files.module';

import { RelationalcoursePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CoursesService } from './course.service';
import { coursesController } from './course.controller';

import { CategoryModule } from 'src/category/category.module';
import { LanguageModule } from 'src/language/language.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';

const infrastructurePersistenceModule = RelationalcoursePersistenceModule;

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, LanguageEntity]),
    infrastructurePersistenceModule,
    FilesModule,
    CategoryModule,
    LanguageModule,
  ],
  controllers: [coursesController],
  providers: [CoursesService],
  exports: [CoursesService, infrastructurePersistenceModule],
})
export class coursesModule {}
