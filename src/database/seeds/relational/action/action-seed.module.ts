import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionSeedService } from './Action-seed.service';
import { ActionEntity } from 'src/actions/infrastructure/persistence/relational/entities/actions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity])],
  providers: [ActionSeedService],
  exports: [ActionSeedService],
})
export class ActionSeedModule {}
