import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Action } from '../domain/action';

export class ActionDto implements Action {
  @ApiProperty()
  @IsNumber()
  id: number;
}
