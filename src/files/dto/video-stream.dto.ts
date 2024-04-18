import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class VideoDto {
  @ApiProperty({ example: 'ApiProperty' })
  @IsString()
  path: string;
}
