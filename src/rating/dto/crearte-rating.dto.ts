import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsNotEmpty()
  ratedEntityId: number | string;

  @ApiProperty()
  @IsNotEmpty()
  readonly userId: number | string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  ratingValue: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  comments?: string;

  @ApiProperty()
  @IsNotEmpty()
  dateTime: Date;
}
