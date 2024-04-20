import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatechapterDto } from 'src/chapter/dto/update-chapter.dto';


export class UpdateCourseDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsString()
  course_topic?: string;

  @IsOptional()
  @IsString()
  durations?: string;

  @IsOptional()
  @IsString()
  course_thumbnail?: string;

  @IsOptional()
  @IsString()
  course_trailer?: string;

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

}
