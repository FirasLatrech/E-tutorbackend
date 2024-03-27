import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Instructor } from '../domain/instructor';
import { RoleDto } from 'src/roles/dto/role.dto';

export class FilterinstructorDto {
  @ApiProperty({ type: RoleDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles?: RoleDto[] | null;
}

export class SortinstructorDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Instructor;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryinstructorDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterinstructorDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterinstructorDto)
  filters?: FilterinstructorDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    value ? plainToInstance(SortinstructorDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortinstructorDto)
  sort?: SortinstructorDto[] | null;
}
