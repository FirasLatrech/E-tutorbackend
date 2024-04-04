import { Module } from '@nestjs/common';

import { SessionModule } from 'src/session/session.module';
import { RelationalLevelPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { levelService } from './level.service';
import { LevelController } from './level.controller';

const infrastructurePersistenceModule = RelationalLevelPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, SessionModule],
  providers: [levelService],
  controllers: [LevelController],

  exports: [levelService, infrastructurePersistenceModule],
})
export class LevelModule {}
