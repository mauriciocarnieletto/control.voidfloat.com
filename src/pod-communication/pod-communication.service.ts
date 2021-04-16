import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PodCommandDTO } from 'src/pod-configuration-commands/entities/pod-configuration-command.entity';
import { PodService } from 'src/pod/pod.service';
import {
  PodScreenData,
  PingResult,
  PodConfiguration,
  EquipamentConfiguration,
} from './interfaces';

@Injectable()
export class PodCommunicationService {
  protocol: string;
  port: string;
  host: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private podService: PodService,
  ) {
    this.init();
  }

  init() {
    const { port, protocol } = this.configService.get<{
      port: string;
      protocol: string;
    }>('pod');
    this.protocol = protocol;
    this.port = port;
  }

  getUrl(method: string, host?: string): string {
    return `${this.protocol}://${host || this.host}:${this.port}/${method}`;
  }

  async ping(host?: string) {
    try {
      const pingResponse = await this.httpService.axiosRef.get<PingResult>(
        this.getUrl('initialscreen', host),
      );
      const statusResponse = await this.httpService.axiosRef.get<PingResult>(
        this.getUrl('loadstatus', host),
      );
      return {
        isPod: true,
        hostname: host,
        model: 'Void One',
        ipAddress: host,
        screen: pingResponse.data,
        status: statusResponse.data,
        connection: { isConnected: true },
      };
    } catch (error) {
      console.log(`Host ${host} is not a pod.`);
      return { isPod: false, host };
    }
  }

  async setConfig(config: PodConfiguration) {
    return this.httpService.axiosRef.post(this.getUrl('setconfig'), config);
  }

  async sendCommandToPod(podId: string, command: PodCommandDTO) {
    const pod = await this.podService.findOne(Number(podId));
    return this.httpService.axiosRef.post(
      this.getUrl('commands', pod.ipAddress),
      command,
    );
  }

  async sendEquipamentConfiguration(command: EquipamentConfiguration) {
    return this.httpService.axiosRef.post(this.getUrl('setequip'), command);
  }

  async getTime(): Promise<Date> {
    const {
      data: { hours, minutes, seconds, day, month, year },
    } = await this.httpService.axiosRef.get<{
      hours: number;
      minutes: number;
      seconds: number;
      day: number;
      month: number;
      year: number;
    }>(this.getUrl('readhours'));

    return new Date(year, month, day, hours, minutes, seconds);
  }

  async getMusic() {
    return this.httpService.axiosRef.get<string>(
      this.getUrl('readmusics?offset=0'),
    );
  }

  async getStatus() {
    return this.httpService.axiosRef.get<PodScreenData>(
      this.getUrl('initialScreen'),
    );
  }
}
