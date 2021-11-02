import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../common/dto/pagination.dto';
import { Relations } from '../enum/relations.enum';

export class FilterUsersDto extends PaginationDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(Relations, { each: true })
  includes: Relations[];
}
