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
import { instructorsService } from './instructor.service';
import { Instructor } from './domain/instructor';
import { QueryinstructorDto } from './dto/query-user.dto';
import { CreateinstructorDto } from './dto/create-instructor.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Instructors')
@Controller({
  path: 'Instructors',
  version: '1',
})
export class InstructorsController {
  constructor(private readonly InstructorsService: instructorsService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateinstructorDto): Promise<Instructor> {
    return this.InstructorsService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryinstructorDto,
  ): Promise<InfinityPaginationResultType<Instructor>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.InstructorsService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
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
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async findOne(
    @Param('id') id: Instructor['id'],
  ): Promise<NullableType<Instructor>> {
    // const InstructorRepository = AppDataSource.getRepository(InstructorEntity);
    // const Instructor = await InstructorRepository.findOneBy({
    //   id: 1,
    // });
    // console.log(Instructor, 'jsdjsjdsjdjsdjsjdjsjdsjd Instructor ✨');
    return this.InstructorsService.findOne({ id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  // update(
  //   @Param('id') id: Instructor['id'],
  //   @Body() updateProfileDto: UpdateInstructorDto,
  // ) {
  //   // return this.InstructorsService.update(id, updateProfileDto);
  // }
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Instructor['id']): Promise<void> {
    return this.InstructorsService.softDelete(id);
  }
}
