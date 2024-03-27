import { Module } from '@nestjs/common';

import { LanguageService } from './Language.service';
import { RelationalLanguagePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { LanguageController } from './Language.controller';
import { SessionModule } from 'src/session/session.module';

const infrastructurePersistenceModule = RelationalLanguagePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, SessionModule],
  providers: [LanguageService],
  controllers: [LanguageController],

  exports: [LanguageService, infrastructurePersistenceModule],
})
export class LanguageModule {}
