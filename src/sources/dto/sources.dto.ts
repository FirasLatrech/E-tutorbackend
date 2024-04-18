import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Sources } from '../domain/sources';

export class SourcesDto implements Sources {
  @ApiProperty()
  @IsNumber()
  id: number;
}
