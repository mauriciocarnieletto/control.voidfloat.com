import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { createClient, RedisClient } from 'redis';

@WebSocketGateway({ namespace: '/pod-gateway' })
export class PodGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  redis: RedisClient;

  private logger: Logger = new Logger('MessageGateway');

  constructor() {
    this.redis = createClient();
    this.redis.subscribe('podStatus');
  }

  @SubscribeMessage('watchPods')
  public joinRoom(client: Socket, room: string): void {
    this.redis
      .on('message', function (channel, message) {
        client.emit('podStatus', { channel, message });
      })
      .on('error', console.error);
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
