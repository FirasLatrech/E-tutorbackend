import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToClass } from 'class-transformer';

import { Category } from '../domain/category';

export class FilterCategoryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  color?: string;
}

export class SortCategoryDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Category;

  @ApiProperty()
  @IsString()
  order: 'ASC' | 'DESC';
}
// export class SortCourseDto {
//   @ApiProperty()
//   @IsString()
//   orderBy: keyof Course;

//   @ApiProperty()
//   @IsString()
//   order: 'ASC' | 'DESC';
// }
export class QueryCateoryDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: FilterCategoryDto, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(FilterCategoryDto, value) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCategoryDto)
  filters?: FilterCategoryDto | null;

  @ApiProperty({ type: SortCategoryDto, isArray: true, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(SortCategoryDto, value) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortCategoryDto)
  sort?: SortCategoryDto[] | null;
}
