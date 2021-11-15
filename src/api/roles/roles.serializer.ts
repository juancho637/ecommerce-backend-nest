import { Type } from 'class-transformer';

import { User } from '../users/entities/user.entity';
import { UsersSerializer } from '../users/users.serializer';

export class RolesSerializer {
  id: number;
  name: string;
  description: string;

  @Type(() => UsersSerializer)
  users: User[];
}
