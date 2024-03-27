import { Module } from '@nestjs/common';

import { InstructorsController } from './instructor.controller';
import { instructorsService } from './instructor.service';
import { RelationalInstructorPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalInstructorPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [InstructorsController],
  providers: [instructorsService],
  exports: [instructorsService, infrastructurePersistenceModule],
})
export class InstructorModule {}
