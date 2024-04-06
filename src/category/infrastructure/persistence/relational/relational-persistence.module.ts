import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

import { CategoryRelationalRepository } from './repositories/category.repository';
import { CategoryRepository } from '../category.repository';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityAuditLog } from 'src/audit/infrastructure/persistence/relational/entities/entity-audit-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
      CourseEntity,
      UserEntity,
      EntityAuditLog,
    ]),
  ],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryRelationalRepository,
    },
  ],
  exports: [CategoryRepository],
})
export class RelationalCategoryPersistenceModule {}
