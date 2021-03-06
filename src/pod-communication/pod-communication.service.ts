import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { PodCommandDTO } from 'src/pod-configuration-commands/entities/pod-configuration-command.entity';
import { Pod } from 'src/pod/entities/pod.entity';
import { PodService } from 'src/pod/pod.service';
import { ServerConfiguration } from 'src/server-configuration/entities/server-configuration.entity';
import { Repository } from 'typeorm';
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
    @Inject('SERVER_CONFIGURATION_REPOSITORY')
    private serverConfigurationRepository: Repository<ServerConfiguration>,
  ) {
    this.init();
  }

  async init() {
    const { port, protocol } = this.configService.get<{
      port: string;
      protocol: string;
    }>('pod');
    const configuration = await this.serverConfigurationRepository.findOne();
    this.protocol = protocol;
    this.port = configuration?.podPort.toString() || '80';
  }

  getUrl(method: string, host?: string, port?: string): string {
    const thisPort = port || this.port.toString();
    return `${this.protocol}://${host || this.host}${
      thisPort === '80' ? '' : `:${thisPort}`
    }/${method}`;
  }

  async pingHost(host?: string) {
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

  async pingPod({ ipAddress: host, port }: Pod) {
    try {
      const pingResponse = await this.httpService.axiosRef.get<PingResult>(
        this.getUrl('initialscreen', host, port),
      );
      const statusResponse = await this.httpService.axiosRef.get<PingResult>(
        this.getUrl('loadstatus', host, port),
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
      console.log(`Pod ${host} did not respond.`);
      return { isPod: false, host };
    }
  }

  async treatePodResponse(response: AxiosResponse<any>) {
    if ([200, 201].includes(response.status)) return { status: 'ok' };

    throw new Error(
      `N??o foi poss??vel executar o comando na pod. Status ${
        response.status
      } ${JSON.stringify(response.data)}`,
    );
  }

  async executeAction(podId: string, actionId: string, params?: any) {
    const actions = await import('../../resources/parameters/pod-actions.json');
    const pod = await this.podService.findOne(Number(podId));
    const action = actions.find((ac) => ac.id === Number(actionId));
    const responses = [];

    for (const { action: operation, data } of params || action.data) {
      if (operation === 'wait' && !Number.isNaN(data)) {
        await new Promise((resolve) => setTimeout(resolve, Number(data)));
      }
      if (operation === 'setconfig') {
        responses.push(await this.setConfig(pod, data as PodConfiguration));
      }
      if (operation === 'command') {
        responses.push(
          await this.sendCommandToPod(podId, data as PodCommandDTO),
        );
      }
    }

    return responses;
  }

  async setConfig(pod: Pod, config: PodConfiguration) {
    return this.treatePodResponse(
      await this.httpService.axiosRef.post(
        this.getUrl('setconfig', pod.hostname, pod.port),
        config,
      ),
    );
  }

  async sendCommandToPod(podId: string, commandData: PodCommandDTO) {
    const { command, time } = commandData;
    const body: { command: number; time?: number } = {
      command: Number(command),
    };
    if (time) body.time = Number(time);

    const pod = await this.podService.findOne(Number(podId));
    const response = await this.httpService.axiosRef({
      method: 'POST',
      url: this.getUrl('commands', pod.ipAddress),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: body,
    });

    return this.treatePodResponse(response.data);
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
