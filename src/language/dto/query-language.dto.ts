import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToClass } from 'class-transformer';
import { LanguageEntity } from '../infrastructure/persistence/relational/entities/Language.entity';

export class FilterLanguageryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  color?: string;
}

export class SortLanguageryDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof LanguageEntity;

  @ApiProperty()
  @IsString()
  order: 'ASC' | 'DESC';
}

export class QueryLanguageDto {
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

  @ApiProperty({ type: FilterLanguageryDto, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(FilterLanguageryDto, value) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterLanguageryDto)
  filters?: FilterLanguageryDto | null;

  @ApiProperty({ type: SortLanguageryDto, isArray: true, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToClass(SortLanguageryDto, value) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortLanguageryDto)
  sort?: SortLanguageryDto[] | null;
}
