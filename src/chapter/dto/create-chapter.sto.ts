import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.sto';

export class CreateChapterDto {
  @IsString()
  @ApiProperty()
  title: string;
  @IsNumber()
  @ApiProperty()
  rang: number;
  @IsArray()
  @ApiProperty()
  lessons: CreateLessonDto[];
}
