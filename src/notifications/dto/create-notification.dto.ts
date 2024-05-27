import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @ApiProperty()
  message: string;

  @IsString()
  @ApiProperty({ enum: ['course_viewed', 'course_joined', 'course_bought'] })
  type: string;

  @IsString()
  @ApiProperty({ type: 'string'})
  courseId: string;
}
