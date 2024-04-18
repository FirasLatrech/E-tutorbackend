import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Lesson } from 'src/lesson/domain/lesson';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.sto';
import { LessonEntity } from 'src/lesson/infrastructure/persistence/relational/entities/lesson.entity';

export class CreateChapterDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsArray()
  @ApiProperty()
  lessons: CreateLessonDto[];
}
