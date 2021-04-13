import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PodConfigurationCommand {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  key: string;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 500 })
  description: string;
  @Column({ nullable: true })
  icon?: string;
  @Column({ nullable: true })
  color?: string;
  @Column()
  value: number;
}
