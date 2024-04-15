import { Module } from '@nestjs/common';
import { FilesModule } from 'src/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';

import { UsersModule } from 'src/users/users.module';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { LevelModule } from 'src/level/level.module';
import { ChapterController } from './lesson.controller';
import { ChapterService } from './lesson.service';
import { RelationalchapterPersistenceModule } from './infrastructure/persistence/relational-persistence.module';

import { CategoryModule } from 'src/category/category.module';
import { LanguageModule } from 'src/language/language.module';

const infrastructurePersistenceModule = RelationalchapterPersistenceModule;

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserEntity]),
    infrastructurePersistenceModule,
    LevelModule,
    FilesModule,
    UsersModule,
    CategoryModule,
    LanguageModule,
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService, infrastructurePersistenceModule],
})
export class lessonModule {}