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

import { LanguageService } from './language.service';
import { QueryLanguageDto } from './dto/query-language.dto';
import { language } from './domain/language';
import { CreateLanguageryDto } from './dto/crearte-language.dto';

@ApiBearerAuth()
@Roles(RoleEnum.user,RoleEnum.admin,RoleEnum.instructor)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Language')
@Controller({
  path: 'Language',
  version: '1',
})
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createLanguageDto: CreateLanguageryDto,
    @Req() req,
  ): Promise<language> {
    return this.languageService.create(createLanguageDto, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryLanguageDto,
  ): Promise<InfinityPaginationResultType<language>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;

    // Ensure limit does not exceed 50
    if (limit > 50) {
      limit = 50;
    }

    // Call findManyWithPagination with provided query options
    const categories = await this.languageService.findManyWithPagination({
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
  // remove(@Param('id') id: language['id']): Promise<void> {
  //   console.log(id);

  //   return this.LanguageService.softDelete(id);
  // }
}
