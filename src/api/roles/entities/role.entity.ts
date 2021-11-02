import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleNames } from '../enums/role-names.enum';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleNames;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
