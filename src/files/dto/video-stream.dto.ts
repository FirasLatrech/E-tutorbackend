import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VideoDto {
  @ApiProperty({ example: 'ApiProperty' })
  @IsString()
  path: string;
}
