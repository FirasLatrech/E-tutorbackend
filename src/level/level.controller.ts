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
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { CreateLevelDto } from './dto/crearte-level.dto';
import { Level } from './domain/level';
import { QueryLevelDto } from './dto/query-level.dto';
import { levelService } from './level.service';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Level')
@Controller({
  path: 'Level',
  version: '1',
})
export class LevelController {
  constructor(private readonly LevelService: levelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLevelDto: CreateLevelDto, @Req() req): Promise<Level> {
    return this.LevelService.create(createLevelDto, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryLevelDto,
  ): Promise<InfinityPaginationResultType<Level>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;

    // Ensure limit does not exceed 50
    if (limit > 50) {
      limit = 50;
    }

    // Call findManyWithPagination with provided query options
    const categories = await this.LevelService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });

    // Return paginated result
    return infinityPagination(categories, { page, limit });
  }
  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id') id: Level['id']): Promise<void> {
  //   console.log(id);

  //   return this.LevelService.softDelete(id);
  // }
}
