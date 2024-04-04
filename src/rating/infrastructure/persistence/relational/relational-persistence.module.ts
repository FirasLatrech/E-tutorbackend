import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity'; // Import RatingEntity
import { RatingRepository } from '../rating.repository';
import { RatingRelationalRepository } from './repositories/rating.repository';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity, UserEntity])],
  providers: [
    {
      provide: RatingRepository, // Provide RatingRepository
      useClass: RatingRelationalRepository, // Use the appropriate repository for ratings
    },
  ],
  exports: [RatingRepository], // Export RatingRepository for use in other modules
})
export class RelationalRatingPersistenceModule {}
