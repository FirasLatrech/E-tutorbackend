import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from 'src/files/dto/file.dto';
import { CreateChapterDto } from 'src/chapter/dto/create-chapter.sto';

export class UpdateCourseDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty()
  @IsOptional()
  @IsString() 
  course_topic?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  course_category_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  course_sub_category_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  course_language_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  subtitle_language_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  course_level_id?: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsString()
  durations?: string;

  @IsOptional()
  course_thumbnail?: FileDto;

  @IsOptional()
  @IsString({ each: true })
  course_content?: string[];

  @IsOptional()
  @IsString({ each: true })
  target_audience?: string[];

  @IsOptional()
  @IsString({ each: true })
  course_requirements?: string[];

  @IsOptional()
  @IsString()
  course_trailer?: string;

  @IsOptional()
  @IsString()
  course_descriptions?: string;

  @IsOptional()
  @IsString()
  welcome_message?: string;

  @IsOptional()
  @IsString()
  congratulation_message?: string;

  @IsOptional()
  @IsString()
  course_price?: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsOptional()
  @IsString()
  progress?: string;

  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsNumber()
  enrollmentCount?: number;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty()
  @IsOptional()
  chapters:CreateChapterDto[];
}
