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
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notifications.service';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { Notification } from './domain/notification';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user, RoleEnum.instructor)
@UseGuards(AuthGuard('jwt'))
@ApiTags('Notification')
@Controller({
  path: 'Notification',
  version: '1',
})
export class NotificationsController {
  constructor(private readonly NotificationService: NotificationService) {}

  @Post()
  @ApiBody({ type: CreateNotificationDto })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateNotificationDto) {
    return this.NotificationService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryNotificationDto,
  ): Promise<InfinityPaginationResultType<Notification>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.NotificationService.findManyWithPagination({
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
  async findAllNotificationOfCourse(
    @Query() query: QueryNotificationDto,
    @Param('id') id,
  ): Promise<InfinityPaginationResultType<Notification>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const search = query?.search ?? '';

    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.NotificationService.findManyWithPagination({
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
  ): Promise<NullableType<Notification>> {
    return this.NotificationService.findOne({ id });
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
          return  this.NotificationService.update(id, updateChapterDto);
        }
        */
  //@Delete(':id')
  //@ApiParam({
  //  name: 'id',
  //  type: String,
  //  required: true,
  //})
  //@HttpCode(HttpStatus.NO_CONTENT)
  //remove(@Param('id') id: Chapter['id']): Promise<void> {
  //  return this.NotificationService.softDelete(id);
  //}
}
