import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';

import { RoleDto } from 'src/roles/dto/role.dto';
import { Chapter } from 'src/chapter/domain/chapter';

export class FilterLessonDto {
  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles?: RoleDto[] | null;
}
export class SortLessonDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Chapter;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryLessonDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterLessonDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterLessonDto)
  filters?: FilterLessonDto | null;

  @ApiPropertyOptional({ type: [SortLessonDto] })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortLessonDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortLessonDto)
  sort?: SortLessonDto[] | null;
}
