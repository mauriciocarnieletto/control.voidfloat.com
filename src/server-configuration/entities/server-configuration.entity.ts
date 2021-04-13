import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServerConfiguration {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  clientId: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  sshPort?: string;

  @Column({ nullable: true })
  hostname?: string;

  @Column({ nullable: true })
  gatewayIp?: string;

  @Column({ nullable: true, length: 500 })
  localIp?: string;

  @Column({ nullable: true, length: 500 })
  publicIp?: string;

  @Column({ nullable: true, length: 500 })
  subnet?: string;

  @Column({ nullable: true, default: '/initialscreen', length: 500 })
  podPingEndpoint?: string;

  @Column({ nullable: true, default: process.env.VOID_HTTP_PORT })
  podPort?: number;
}
