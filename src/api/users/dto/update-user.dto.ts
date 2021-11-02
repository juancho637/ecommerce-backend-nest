import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { IsStatusAlreadyExist } from '../decorators/is-status-already-exist.decorator';
import { Status } from '../../statuses/entities/status.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsStatusAlreadyExist()
  status: Status;
}
