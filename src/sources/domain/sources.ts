import { Allow, IsNumber } from 'class-validator';

export class Sources {
  @IsNumber()
  id: number;

  @Allow()
  name?: string;
}
