import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

import { RatingRepository } from './infrastructure/persistence/rating.repository'; // Import RatingRepository

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Rating } from './domain/rating';
import { FilterratingDto, SortratingDto } from './dto/query-rating.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

import { CreateRatingDto } from './dto/crearte-rating.dto';
import { RatingEntity } from './infrastructure/persistence/relational/entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly userService: UsersService,
  ) {}

  findOne(options: EntityCondition<Rating>): Promise<NullableType<Rating>> {
    return this.ratingRepository.findOne(options);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterratingDto | null;
    sortOptions?: SortratingDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Rating[]> {
    return this.ratingRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async create(data: CreateRatingDto): Promise<Rating> {
    const rating = new RatingEntity();
    const clonedPayload = {
      ...rating,
      ...data,
    };

    if (data?.userId) {
      const user = (await this.userService.findOneWithNoRelation({
        id: data.userId,
      })) as UserEntity;
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              userID: 'user ID  DoesNotExist',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.user = user;
    }

    const result = this.ratingRepository.create(clonedPayload);

    return result;
  }

  async softDelete(id: Rating['id']): Promise<void> {
    await this.ratingRepository.softDelete(id);
  }
}
