import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';

import { QueryRatingDto } from './dto/query-rating.dto'; // Import DTO for querying ratings
import { CreateRatingDto } from './dto/crearte-rating.dto';
import { Rating } from './domain/rating';
import { RatingService } from './rating.service';

@ApiBearerAuth()
@ApiTags('Rating')
@Controller({
  path: 'rating',
  version: '1',
})
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    console.log(createRatingDto);

    return this.ratingService.create(createRatingDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryRatingDto,
  ): Promise<InfinityPaginationResultType<Rating>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;

    // Ensure limit does not exceed 50
    if (limit > 50) {
      limit = 50;
    }

    // Call findManyWithPagination with provided query options
    const ratings = await this.ratingService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: { page, limit },
    });

    // Return paginated result
    return infinityPagination(ratings, { page, limit });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Rating['id']): Promise<void> {
    return this.ratingService.softDelete(id);
  }
}
