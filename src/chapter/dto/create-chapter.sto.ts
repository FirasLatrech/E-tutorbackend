import { IsArray, IsString } from "class-validator";

export class CreateChapterDto{
    @IsString()
    title: string;
  
    @IsArray()
    @IsString({ each: true })
    lessons: string[];
  
}