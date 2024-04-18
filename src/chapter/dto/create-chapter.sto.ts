import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.sto';

export class CreateChapterDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsArray()
  @ApiProperty()
  lessons: CreateLessonDto[];
}
