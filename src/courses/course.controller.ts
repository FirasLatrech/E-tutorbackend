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
} from '@nestjs/common';

import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { NullableType } from '../utils/types/nullable.type';
// import { QuerycourseDto } from './dto/query-course.dto';
import { Course } from './domain/course';
import { CoursesService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';

import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { QueryCourseDto } from './dto/query-course.dto';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('courses')
@Controller({
  path: 'courses',
  version: '1',
})
export class coursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateCourseDTO) {
    return this.coursesService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryCourseDto,
  ): Promise<InfinityPaginationResultType<Course>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.coursesService.findManyWithPagination({
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
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('get-by-ids')
  @HttpCode(HttpStatus.OK)
  async findCoursesByIds(@Body() ids: string[]) {
    return await this.coursesService.findCoursesByIds(ids);
  }

  @Get('studentCourses/:id')
  @HttpCode(HttpStatus.OK)
  async findAllCourseOfStuent(
    @Query() query: QueryCourseDto,
  ): Promise<InfinityPaginationResultType<Course>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.coursesService.findManyWithPagination({
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
  ): Promise<NullableType<Course>> {
    return this.coursesService.findOne({ id });
  }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Patch(':id')
  // @HttpCode(HttpStatus.OK)
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // // update(
  // //   @Param('id') id: course['id'],
  // //   @Body() updateProfileDto: Updatecourse,
  // // ): Promise<course | null> {
  // //   return this.coursesService.update(id, updateProfileDto);
  // // }
  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id') id: course['id']): Promise<void> {
  //   return this.coursesService.softDelete(id);
  // }
}
