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

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
