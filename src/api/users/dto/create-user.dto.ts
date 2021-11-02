import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { Role } from '../../roles/entities/role.entity';
import { IsRolesAlreadyExist } from '../decorators/is-roles-already-exist.decorator';
import { IsUserAlreadyExist } from '../decorators/is-user-already-exist.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserAlreadyExist()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsRolesAlreadyExist()
  roles: Role[];
}
