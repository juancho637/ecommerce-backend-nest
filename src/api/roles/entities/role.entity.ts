import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleNames } from '../enums/role-names.enum';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleNames;

  @Column({ type: 'text' })
  description: string;
}
