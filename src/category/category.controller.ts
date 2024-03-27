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
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';

import { CategoryService } from './category.service';
import { Category } from './domain/category';
import { CreateCategoryDto } from './dto/crearte-category.dto';
import { QueryCateoryDto } from './dto/query-category.dto';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Category')
@Controller({
  path: 'category',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req,
  ): Promise<Category> {
    console.log(Category);
    return this.categoryService.create(createCategoryDto, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryCateoryDto,
  ): Promise<InfinityPaginationResultType<Category>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;

    // Ensure limit does not exceed 50
    if (limit > 50) {
      limit = 50;
    }

    // Call findManyWithPagination with provided query options
    const categories = await this.categoryService.findManyWithPagination({
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
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Category['id']): Promise<void> {
    console.log(id);

    return this.categoryService.softDelete(id);
  }
}
