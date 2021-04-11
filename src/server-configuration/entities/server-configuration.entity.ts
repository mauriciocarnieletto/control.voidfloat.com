import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServerConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  sshPort: number;

  @Column()
  hostname: string;

  @Column()
  gatewayIp: string;

  @Column({ length: 500 })
  localIp: string;

  @Column({ length: 500 })
  externalIp: string;

  @Column({ length: 500 })
  podsNet: string;
}
