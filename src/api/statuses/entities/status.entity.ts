import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
