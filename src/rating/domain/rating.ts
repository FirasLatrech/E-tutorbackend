import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

export class Rating {
  id: number | string;
  ratedEntityId: number | string;
  user: UserEntity | string;
  ratingValue: number;
  comments?: string;
}
