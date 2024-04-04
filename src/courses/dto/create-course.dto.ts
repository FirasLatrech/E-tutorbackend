import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateCourseDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsUUID()
  course_category_id?: UUID;
  @ApiProperty()
  @IsUUID()
  course_sub_category_id?: UUID;

  @ApiProperty()
  @IsNumber()
  course_language_id?: number;
  @ApiProperty()
  @IsNumber()
  subtitle_language_id?: number;
  @ApiProperty()
  @IsNumber()
  course_level_id: number;

  @ApiProperty()
  @IsString()
  course_topic: string;

  @ApiProperty()
  @IsString()
  durations: string;
  @IsString({ each: true })
  readonly course_instructor: string[];

  @IsString({ each: true })
  readonly users: string[];
  @ApiProperty()
  @IsOptional()
  @IsUrl()
  course_thumbnail?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  course_trailer?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Object)
  course_descriptions?: any;

  @ApiProperty()
  @IsOptional()
  @Type(() => Object)
  course_content?: any;

  @ApiProperty()
  @IsOptional()
  @Type(() => Object)
  target_audience?: any;

  @ApiProperty()
  @IsOptional()
  @Type(() => Object)
  course_requirements?: any;

  @ApiProperty()
  @IsOptional()
  @Type(() => Object)
  course_curriculum?: any;

  @ApiProperty()
  @IsOptional()
  @IsString()
  welcome_message?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  congratulation_message?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  course_price?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  discount?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
