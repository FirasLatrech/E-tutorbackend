import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';

import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
// import { QuerycourseDto } from './dto/query-course.dto';
import { course } from './domain/course';
import { coursesService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { courseEntity } from './infrastructure/persistence/relational/entities/course.entity';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('courses')
@Controller({
  path: 'courses',
  version: '1',
})
export class coursesController {
  constructor(private readonly coursesService: coursesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateCourseDTO) {
    console.log(createProfileDto);
    return this.coursesService.create(createProfileDto);
  }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async findAll(
  //   @Query() query: QuerycourseDto,
  // ): Promise<InfinityPaginationResultType<course>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.coursesService.findManyWithPagination({
  //       filterOptions: query?.filters,
  //       sortOptions: query?.sort,
  //       paginationOptions: {
  //         page,
  //         limit,
  //       },
  //     }),
  //     { page, limit },
  //   );
  // }

  @SerializeOptions({})
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: courseEntity['id']): Promise<NullableType<course>> {
    console.log(id);
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
