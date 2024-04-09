import { Module } from '@nestjs/common';
import { FilesModule } from 'src/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { LanguageEntity } from 'src/Language/infrastructure/persistence/relational/entities/Language.entity';
import { UsersModule } from 'src/users/users.module';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { LevelModule } from 'src/level/level.module';
import  { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { RelationalchapterPersistenceModule } from './infrastructure/persistence/relational-persistence.module';
import { CategoryService } from 'src/category/category.service';
import { UsersService } from 'src/users/users.service';
import { levelService } from 'src/level/level.service';
import { LanguageService } from 'src/language/Language.service';
import { CategoryEntity } from 'src/category/infrastructure/persistence/relational/entities/category.entity';
import { CategoryRepository } from 'src/category/infrastructure/persistence/category.repository';
import { CategoryModule } from 'src/category/category.module';
import { LanguageModule } from 'src/language/language.module';

const infrastructurePersistenceModule = RelationalchapterPersistenceModule;

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      UserEntity,
        ]),
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
export class chapterModule {}
