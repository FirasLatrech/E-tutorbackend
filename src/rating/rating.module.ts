import { Module } from '@nestjs/common';
import { RatingService } from './rating.service'; // Import RatingService
import { RelationalRatingPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module'; // Import RelationalRatingPersistenceModule
import { SessionModule } from 'src/session/session.module';
import { RatingController } from './rating.controller';
import { UsersModule } from 'src/users/users.module';

const infrastructurePersistenceModule = RelationalRatingPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, SessionModule, UsersModule],
  providers: [RatingService], // Use RatingService instead of CategoryService
  controllers: [RatingController], // Import RatingController

  exports: [RatingService, infrastructurePersistenceModule], // Export RatingService and infrastructurePersistenceModule
})
export class RatingModule {}
