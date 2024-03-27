import { Allow, IsNumber } from 'class-validator';

export class Action {
  @IsNumber()
  id: number;

  @Allow()
  name?: string;
}
