import { IsArray, IsString } from 'class-validator';

export class UpdateLessonDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  lessons: string[];
}
