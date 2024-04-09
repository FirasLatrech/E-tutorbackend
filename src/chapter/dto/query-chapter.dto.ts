import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';

import { RoleDto } from 'src/roles/dto/role.dto';
import { Chapter } from '../domain/chapter';


export class FilterChapterDto {
    @ApiPropertyOptional({ type: RoleDto })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RoleDto)
    roles?: RoleDto[] | null;
  }
  export class SortChapterDto {
    @ApiProperty()
    @Type(() => String)
    @IsString()
    orderBy: keyof Chapter;
  
    @ApiProperty()
    @IsString()
    order: string;
  }
  
export class QueryChapterDto{
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
      value ? plainToInstance(FilterChapterDto, JSON.parse(value)) : undefined,
    )
    @ValidateNested()
    @Type(() => FilterChapterDto)
    filters?: FilterChapterDto | null;
  
    @ApiPropertyOptional({ type: [SortChapterDto] })
    @IsOptional()
    @Transform(({ value }) => {
      return value
        ? plainToInstance(SortChapterDto, JSON.parse(value))
        : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortChapterDto)
    sort?: SortChapterDto[] | null;
}