import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatechapterDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  lessons: string[];

}
