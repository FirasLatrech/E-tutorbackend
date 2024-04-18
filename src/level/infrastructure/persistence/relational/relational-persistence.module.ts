import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './entities/level.entity';

import { LevelRelationalRepository } from './repositories/level.repository';
import { LevelRepository } from '../level.repository';

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
