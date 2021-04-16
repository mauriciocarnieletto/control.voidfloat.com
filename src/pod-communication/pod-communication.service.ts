import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePodCommunicationDto } from './dto/create-pod-communication.dto';
import { UpdatePodCommunicationDto } from './dto/update-pod-communication.dto';
import {
  Command,
  Commands,
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

  create(createPodCommunicationDto: CreatePodCommunicationDto) {
    return 'This action adds a new podCommunication';
  }

  findAll() {
    return `This action returns all podCommunication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} podCommunication`;
  }

  update(id: number, updatePodCommunicationDto: UpdatePodCommunicationDto) {
    return `This action updates a #${id} podCommunication`;
  }

  remove(id: number) {
    return `This action removes a #${id} podCommunication`;
  }

  getUrl(method: string, host?: string): string {
    return `${this.protocol}://${host || this.host}:${this.port}/${method}`;
  }

  async ping(host?: string) {
    try {
      const pingResponse = await this.httpService.axiosRef.get<PingResult>(
        this.getUrl('initialscreen', host),
      );
      return { isPod: true, host, ...pingResponse.data };
    } catch (error) {
      console.log(`Host ${host} is not a pod.`, error);
      return { isPod: false, host };
    }
  }

  async setConfig(config: PodConfiguration) {
    return this.httpService.axiosRef.post(this.getUrl('setconfig'), config);
  }

  async sendCommands(command: Command) {
    return this.httpService.axiosRef.post(this.getUrl('commands'), command);
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
