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
import { Exclude } from 'class-transformer';

@Entity({ name: 'statuses' })
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: StatusNames;

  @Exclude()
  @Column()
  abbreviation: StatusAbbreviations;

  @Exclude()
  @Column()
  type: StatusTypes;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.status)
  users: User[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
