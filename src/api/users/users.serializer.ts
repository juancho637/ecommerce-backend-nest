import { Exclude, Type } from 'class-transformer';

import { Role } from '../roles/entities/role.entity';
import { RolesSerializer } from '../roles/roles.serializer';
import { Status } from '../statuses/entities/status.entity';
import { StatusesSerializer } from '../statuses/statuses.serializer';

export class UsersSerializer {
  id: number;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  @Type(() => RolesSerializer)
  roles: Role[];

  @Type(() => StatusesSerializer)
  status: Status;
}
