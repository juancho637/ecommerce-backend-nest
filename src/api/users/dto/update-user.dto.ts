import {
  IsNumber,
  IsOptional,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  roles: number[];

  @IsOptional()
  @IsNumber()
  status: number;
}
