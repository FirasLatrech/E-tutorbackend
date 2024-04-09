import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpStatus,
    HttpCode,
    SerializeOptions,
    Query,
    ParseUUIDPipe,
    Patch,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  
  import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
  
  import { NullableType } from '../utils/types/nullable.type';
  // import { QuerycourseDto } from './dto/query-course.dto';
  
  import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
  import { infinityPagination } from 'src/utils/infinity-pagination';
import { QueryChapterDto } from './dto/query-lesson.dto';
import { CreateChapterDto } from './dto/create-lesson.sto';
import { ChapterService } from './lesson.service';
import { Chapter } from './domain/chapter';
import { UpdatechapterDto } from './dto/update-lesson.dto';
import { AuthGuard } from '@nestjs/passport';
  
  @ApiBearerAuth()
  // @Roles(RoleEnum.admin)
  //@UseGuards(AuthGuard('jwt'))
  @ApiTags('chapters')
  @Controller({
    path: 'chapter',
    version: '1',
  })
  export class ChapterController {
    constructor(private readonly chapterService: ChapterService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createProfileDto: CreateChapterDto) {
      return this.chapterService.create(createProfileDto);
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
    async findAllCourseOfStuent(
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
        return  this.chapterService.update(id, updateChapterDto);
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
       return this.chapterService.softDelete(id);
     }
  }
  