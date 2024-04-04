import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './entities/Level.entity';

import { LevelRelationalRepository } from './repositories/Level.repository';
import { LevelRepository } from '../Level.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LevelEntity])],
  providers: [
    {
      provide: LevelRepository,
      useClass: LevelRelationalRepository,
    },
  ],
  exports: [LevelRepository],
})
export class RelationalLevelPersistenceModule {}
