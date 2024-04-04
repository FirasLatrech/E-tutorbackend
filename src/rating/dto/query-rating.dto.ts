import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToClass } from 'class-transformer';

import { Course } from 'src/courses/domain/course';
import { Rating } from '../domain/rating';

export class FilterratingDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  color?: string;
}

export class SortratingDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Rating;

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
export class QueryRatingDto {
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

  @ApiProperty({ type: FilterratingDto, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(FilterratingDto, value) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterratingDto)
  filters?: FilterratingDto | null;

  @ApiProperty({ type: SortratingDto, isArray: true, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(SortratingDto, value) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortratingDto)
  sort?: SortratingDto[] | null;
}
