import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Notification } from '../domain/notification';

export class FilterNotificationDto {
  @IsOptional()
  chapter?: string | null;
}
export class SortNotificationDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Notification;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryNotificationDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterNotificationDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterNotificationDto)
  filters?: FilterNotificationDto | null;

  @ApiPropertyOptional({ type: [SortNotificationDto] })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortNotificationDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortNotificationDto)
  sort?: SortNotificationDto[] | null;
}
