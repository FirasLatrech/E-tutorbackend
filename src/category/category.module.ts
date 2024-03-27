import { Module } from '@nestjs/common';

import { CategoryService } from './category.service';
import { RelationalCategoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CategoryController } from './category.controller';
import { SessionModule } from 'src/session/session.module';

const infrastructurePersistenceModule = RelationalCategoryPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, SessionModule],
  providers: [CategoryService],
  controllers: [CategoryController],

  exports: [CategoryService, infrastructurePersistenceModule],
})
export class CategoryModule {}
