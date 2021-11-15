import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { StatusNames } from '../enums/status-names.enum';
import { StatusAbbreviations } from '../enums/status-abbreviations.enum';
import { StatusTypes } from '../enums/status-types.enum';

@Entity({ name: 'statuses' })
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: StatusNames;

  @Column()
  abbreviation: StatusAbbreviations;

  @Column()
  type: StatusTypes;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.status)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
