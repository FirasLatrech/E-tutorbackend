import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { UUID } from 'crypto';
import { Chapter } from 'src/chapter/domain/chapter';
import { CreateChapterDto } from 'src/chapter/dto/create-chapter.sto';

export class CreateCourseDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @IsString()
  course_topic: string;

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
  durations: string;
  
  
  @ApiProperty()
  @IsBoolean()
  isDraft:boolean;
}
