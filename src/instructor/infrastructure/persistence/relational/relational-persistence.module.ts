import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorEntity } from './entities/instructor.entity';
import { InstructorRepository } from '../instructors.repository';
import { InstructorsRelationalRepository } from './repositories/instructors.repository';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstructorEntity ,UserEntity])],
  providers: [
    {
      provide: InstructorRepository,
      useClass: InstructorsRelationalRepository,
    },
  ],
  exports: [InstructorRepository],
})
export class RelationalInstructorPersistenceModule {}
