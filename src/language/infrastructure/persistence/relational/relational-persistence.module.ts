import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './entities/Language.entity';

import { LanguageRelationalRepository } from './repositories/language.repository';
import { LanguageRepository } from '../Language.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  providers: [
    {
      provide: LanguageRepository,
      useClass: LanguageRelationalRepository,
    },
  ],
  exports: [LanguageRepository],
})
export class RelationalLanguagePersistenceModule {}
