import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../domain/category";
import { IsNumber, IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty()
    @IsString()
    id: string;
  }
  