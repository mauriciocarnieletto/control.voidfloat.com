import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ActionType } from './actions-types';

@Entity()
export class PodActions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: ActionType;

  @Column()
  data?: string; // { [key in ActionType]: any };
}
