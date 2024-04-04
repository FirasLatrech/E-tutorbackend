import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToClass } from 'class-transformer';
import { LevelEntity } from '../infrastructure/persistence/relational/entities/Level.entity';

export class FilterLevelryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  color?: string;
}

export class SortLevelryDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof LevelEntity;

  @ApiProperty()
  @IsString()
  order: 'ASC' | 'DESC';
}

export class QueryLevelDto {
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

  @ApiProperty({ type: FilterLevelryDto, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(FilterLevelryDto, value) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterLevelryDto)
  filters?: FilterLevelryDto | null;

  @ApiProperty({ type: SortLevelryDto, isArray: true, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(SortLevelryDto, value) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortLevelryDto)
  sort?: SortLevelryDto[] | null;
}
