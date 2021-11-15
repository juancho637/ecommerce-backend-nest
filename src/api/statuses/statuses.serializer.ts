import { Exclude, Type } from 'class-transformer';

import { User } from '../users/entities/user.entity';
import { UsersSerializer } from '../users/users.serializer';
import { StatusAbbreviations } from './enums/status-abbreviations.enum';
import { StatusNames } from './enums/status-names.enum';
import { StatusTypes } from './enums/status-types.enum';

export class StatusesSerializer {
  id: number;
  name: StatusNames;
  description: string;

  @Exclude()
  abbreviation: StatusAbbreviations;

  @Exclude()
  type: StatusTypes;

  @Type(() => UsersSerializer)
  users: User[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
