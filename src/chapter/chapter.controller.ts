import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Query,
  ParseUUIDPipe,
  Delete,
  Post,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';

import { ApiBearerAuth, ApiParam, ApiTags, ApiBody } from '@nestjs/swagger';

import { NullableType } from '../utils/types/nullable.type';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { QueryChapterDto } from './dto/query-chapter.dto';
import { ChapterService } from './chapter.service';
import { Chapter } from './domain/chapter';
import { CreateChapterDto } from './dto/create-chapter.sto';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'))
@ApiTags('chapters')
@Controller({
  path: 'chapter',
  version: '1',
})
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateChapterDto })
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryChapterDto,
  ): Promise<InfinityPaginationResultType<Chapter>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.chapterService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        search,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('course/:id')
  @HttpCode(HttpStatus.OK)
  async findAllCourseOfStudent(
    @Param('id') id: string,
    @Query() query: QueryChapterDto,
  ): Promise<InfinityPaginationResultType<Chapter>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.chapterService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        search,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @SerializeOptions({})
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<NullableType<Chapter>> {
    return this.chapterService.findOne({ id });
  }

  /*@Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiBody({ type: UpdateChapterDto })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ): Promise<Chapter | null> {
    return this.chapterService.update(id, updateChapterDto);
  }*/

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.chapterService.softDelete(id);
  }
}
