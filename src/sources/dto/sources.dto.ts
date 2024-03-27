import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Sources } from '../domain/Sources';

export class SourcesDto implements Sources {
  @ApiProperty()
  @IsNumber()
  id: number;
}
