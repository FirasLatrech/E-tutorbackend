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
  Request,
  UseGuards,
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
import { UpdateCourseDTO } from './dto/update-course-dto';
import { AuthGuard } from '@nestjs/passport';

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

  @SerializeOptions({
    groups: ['me'],
  })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateCourseDTO: CreateCourseDTO, @Request() request) {
    return this.coursesService.create(CreateCourseDTO, request.user);
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

  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findMyCourse(
    @Query() query: QueryCourseDto,
    @Request() request
  ): Promise<InfinityPaginationResultType<Course>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }
    console.log(request.user)
    return infinityPagination(
      await this.coursesService.findMyCourseWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        search,
        paginationOptions: {
          page,
          limit,
        },
      },request.user),
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

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Course['id'],
    @Body() updateProfileDto: UpdateCourseDTO,
    @Request() request,
  ): Promise<Course | null> {
    return this.coursesService.update(id, updateProfileDto,request.user);
  }
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
