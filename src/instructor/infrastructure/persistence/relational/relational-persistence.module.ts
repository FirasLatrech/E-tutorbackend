import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorEntity } from './entities/Instructor.entity';
import { InstructorRepository } from '../instructors.repository';
import { InstructorsRelationalRepository } from './repositories/instructors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InstructorEntity])],
  providers: [
    {
      provide: InstructorRepository,
      useClass: InstructorsRelationalRepository,
    },
  ],
  exports: [InstructorRepository],
})
export class RelationalInstructorPersistenceModule {}
