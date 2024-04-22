import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateLevelDto {
  @ApiProperty()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
