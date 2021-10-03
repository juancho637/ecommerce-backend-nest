import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'statuses' })
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  abbreviation: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
