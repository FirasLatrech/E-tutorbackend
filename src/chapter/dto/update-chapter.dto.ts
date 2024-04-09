import { IsArray, IsString } from 'class-validator';

export class UpdatechapterDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  lessons: string[];
}
