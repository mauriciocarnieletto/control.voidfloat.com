import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PingResult } from './interfaces';

@Injectable({})
export class PodService {
  protocol: string;
  port: string;
  host: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    const { port, protocol } = this.configService.get<{
      port: string;
      protocol: string;
    }>('pod');
    this.protocol = protocol;
    this.port = port;
  }

  getUrl(method: string, host?: string): string {
    return `${this.protocol}${host || this.host}:${this.port}/${method}`;
  }

  async ping(host?: string) {
    return this.httpService.get<PingResult>(this.getUrl('ping', host));
  }
}
