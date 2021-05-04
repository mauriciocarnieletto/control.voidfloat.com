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
  ipAddress: string;

  @Column({ nullable: true })
  port: string;

  @Column()
  hostname: string;

  @Column({ nullable: true })
  status?: string;
}
