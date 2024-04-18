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
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import { NullableType } from '../utils/types/nullable.type';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';

import { Chapter } from 'src/chapter/domain/chapter';
import { Lesson } from './domain/lesson';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { QueryLessonDto } from './dto/query-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.sto';
import { lessonService } from './lesson.service';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user, RoleEnum.instructor)
@UseGuards(AuthGuard('jwt'))
@ApiTags('lesson')
@Controller({
  path: 'lesson',
  version: '1',
})
export class LessonController {
  constructor(private readonly lessonService: lessonService) {}

  @Post()
  @ApiBody({ type: CreateLessonDto })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateLessonDto) {
    return this.lessonService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryLessonDto,
  ): Promise<InfinityPaginationResultType<Lesson>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.lessonService.findManyWithPagination({
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
  @Get('chapter/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async findAllLessonOfChapter(
    @Query() query: QueryLessonDto,
    @Param('id') id,
  ): Promise<InfinityPaginationResultType<Lesson>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.lessonService.findManyLessonOfChapterWithPagination({
        chapter_id: id,
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
  ): Promise<NullableType<Lesson>> {
    return this.lessonService.findOne({ id });
  }

  /* @SerializeOptions({
       groups: ['admin'],
     })
     @Patch(':id')
     @HttpCode(HttpStatus.OK)
     @ApiParam({
       name: 'id',
       type: String,
       required: true,
     })
      update(
        @Param('id') id: Chapter['id'],
        @Body() updateChapterDto: UpdatechapterDto,
      ): Promise<Chapter | null> {
        return  this.lessonService.update(id, updateChapterDto);
      }
      */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Chapter['id']): Promise<void> {
    return this.lessonService.softDelete(id);
  }
}
