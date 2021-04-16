import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class PodCommandDTO {
  id: number;
  time?: number;
  command: number;
}

@Entity()
export class PodConfigurationCommand {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 500 })
  description: string;
  @Column()
  isTimeRequired: boolean;
  @Column()
  command: number;
}
