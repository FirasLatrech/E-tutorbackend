import { Rating } from 'src/rating/domain/rating';
import { RatingEntity } from '../entities/rating.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

export class RatingMapper {
  static toDomain(raw: RatingEntity): Rating {
    const rating = new Rating();
    rating.id = raw.id;
    rating.ratedEntityId = raw.ratedEntityId;
    // rating.userId = raw.userId;
    rating.ratingValue = raw.ratingValue;
    rating.comments = raw.comments;
    return rating;
  }

  static toPersistence(rating: Rating): RatingEntity {
    const ratingEntity = new RatingEntity();
    console.log(rating.user);
    if (rating.id && typeof rating.id === 'string') {
      ratingEntity.id = rating.id;
    }

    ratingEntity.ratedEntityId = rating.ratedEntityId as string;
    ratingEntity.user = rating.user as UserEntity;
    ratingEntity.ratingValue = rating.ratingValue;
    ratingEntity.comments = rating.comments as string;
    return ratingEntity;
  }
}
