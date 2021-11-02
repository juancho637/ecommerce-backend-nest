import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsPositive()
  @Max(100)
  limit: number;
}
