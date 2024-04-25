import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';

import { RoleDto } from 'src/roles/dto/role.dto';
import { Course } from '../domain/course';
import { CategoryDto } from 'src/category/dto/category.dto';

export class FilterCourseDto {
  @ApiPropertyOptional({ type: CategoryDto })
  @IsOptional()
  @Type(() => CategoryDto)
  category?: CategoryDto | null;
}
export class SortCourseDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Course;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCourseDto {
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
    value ? plainToInstance(FilterCourseDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCourseDto)
  filters?: FilterCourseDto | null;

  @ApiPropertyOptional({ type: [SortCourseDto] })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortCourseDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCourseDto)
  sort?: SortCourseDto[] | null;
}
