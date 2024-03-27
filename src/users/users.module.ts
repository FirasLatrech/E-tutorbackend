import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';

import { UsersService } from './users.service';

import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { InstructorModule } from 'src/instructor/instructor.module';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule, InstructorModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
