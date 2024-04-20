import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

export class CreateLessonDto {
  @IsString()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  progress?: number = 0;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isCompleted?: boolean = false;

  @IsString()
  @IsOptional()
  @ApiProperty()
  Captions?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  durationInSeconds?: number = 0;

  @IsString()
  @IsOptional()
  @ApiProperty()
  LectureNotes?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  attachmentFile?: FileEntity;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  VideoUrl?: FileEntity;
}
