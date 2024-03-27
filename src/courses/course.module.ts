import { Module } from '@nestjs/common';

import { FilesModule } from 'src/files/files.module';

import { RelationalcoursePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { coursesService } from './course.service';
import { coursesController } from './course.controller';
import { Category } from 'src/Category/domain/Category';
import { CategoryModule } from 'src/category/category.module';
import { CategoryRepository } from 'src/category/infrastructure/persistence/category.repository';
import { RelationalCategoryPersistenceModule } from 'src/category/infrastructure/persistence/relational/relational-persistence.module';
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
  providers: [coursesService],
  exports: [coursesService, infrastructurePersistenceModule],
})
export class coursesModule {}
