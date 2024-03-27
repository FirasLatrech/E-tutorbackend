import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SourcesEntity } from './infrastructure/persistence/relational/entities/sources.entity';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controler';

@Module({
  imports: [TypeOrmModule.forFeature([SourcesEntity])],
  controllers: [SourcesController],
  providers: [SourcesService],
  exports: [SourcesService],
})
export class ActionSeedModule {}
