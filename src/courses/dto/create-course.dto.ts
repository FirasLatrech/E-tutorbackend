import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateCourseDTO {
  @ApiProperty()
  @IsString()
  title: string;

  // @ApiProperty()
  // @IsNumber()
  // course_category_id?: number;
  // @ApiProperty()
  // @IsNumber()
  // course_sub_category_id?: number;

  // @ApiProperty()
  // @IsNumber()
  // course_language_id?: number;
  // @ApiProperty()
  // @IsNumber()
  // subtitle_language_id?: number;
  // @ApiProperty()
  // @IsNumber()
  // course_level_id?: number;

  // @ApiProperty()
  // @IsString()
  // course_topic: string;

  // @ApiProperty()
  // @IsString()
  // durations: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsUrl()
  // course_thumbnail?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsUrl()
  // course_trailer?: string;

  // @ApiProperty()
  // @IsOptional()
  // @Type(() => Object)
  // course_descriptions?: any;

  // @ApiProperty()
  // @IsOptional()
  // @Type(() => Object)
  // course_content?: any;

  // @ApiProperty()
  // @IsOptional()
  // @Type(() => Object)
  // target_audience?: any;

  // @ApiProperty()
  // @IsOptional()
  // @Type(() => Object)
  // course_requirements?: any;

  // @ApiProperty()
  // @IsOptional()
  // @Type(() => Object)
  // course_curriculum?: any;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // welcome_message?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // congratulation_message?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // course_price?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // discount?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsDate()
  // createdAt?: Date;

  // @ApiProperty()
  // @IsOptional()
  // @IsDate()
  // updatedAt?: Date;

  // @ApiProperty()
  // @IsOptional()
  // @IsDate()
  // deletedAt?: Date;
}
