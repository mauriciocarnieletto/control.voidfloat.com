import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PodConfigurationField {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  key: string;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 500 })
  description: string;
  @Column()
  type: 'number' | 'string' | 'list' | 'boolean';

  @Column({ nullable: true })
  listOptions?: string;
  @Column({ nullable: true })
  numberMin?: number;
  @Column({ nullable: true })
  numberMax?: number;
  @Column({ default: false })
  isAdvanced?: boolean;
  @Column({ nullable: true })
  order?: number;
}
