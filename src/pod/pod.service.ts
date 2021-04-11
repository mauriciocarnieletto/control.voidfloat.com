import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreatePodDto } from './dto/create-pod.dto';
import { UpdatePodDto } from './dto/update-pod.dto';
import { Pod } from './entities/pod.entity';
import {
  Command,
  Commands,
  InitialScreen,
  PingResult,
  PodParameters,
} from './interfaces';

@Injectable()
export class PodService {
  protocol: string;
  port: string;
  host: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @Inject('POD_REPOSITORY')
    private podRepository: Repository<Pod>,
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

  create(createPodDto: CreatePodDto) {
    return this.podRepository.create({ ...createPodDto });
  }

  findAll() {
    return this.podRepository.find();
  }

  findOne(id: number) {
    return this.podRepository.findOne({ id });
  }

  update(id: number, updatePodDto: UpdatePodDto) {
    return this.podRepository.update({ id }, { ...updatePodDto });
  }

  remove(id: number) {
    return this.podRepository.delete({ id });
  }

  getUrl(method: string, host?: string): string {
    return `${this.protocol}://${host || this.host}:${this.port}/${method}`;
  }

  async ping(host?: string) {
    try {
      const pingResponse = await this.httpService.axiosRef.get<PingResult>(
        this.getUrl('ping', host),
      );

      return { isPod: true, host, ...pingResponse };
    } catch (error) {
      console.log(`Host ${host} is not a pod.`, error);
      return { isPod: false, host };
    }
  }

  async setConfig(config: PodParameters) {
    return this.httpService.axiosRef.post(this.getUrl('setconfig'), config);
  }

  async sendCommands(command: Command) {
    return this.httpService.axiosRef.post(this.getUrl('commands'), command);
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
    return this.httpService.axiosRef.get<InitialScreen>(
      this.getUrl('initialScreen'),
    );
  }
}
