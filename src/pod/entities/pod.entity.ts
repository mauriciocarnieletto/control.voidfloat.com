import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  serialNumber: string;

  @Column()
  localIP: string;

  @Column()
  isActive: boolean;
}
