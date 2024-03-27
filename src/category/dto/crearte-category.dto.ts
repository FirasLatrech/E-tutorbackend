import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateCategoryDto {
  create_by: number;

  @ApiProperty()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'red' })
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: 'http://localhost:3000/icon' })
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  courses_count: number;
}
