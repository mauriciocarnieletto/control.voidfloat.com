import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePodDto } from './dto/create-pod.dto';
import { UpdatePodDto } from './dto/update-pod.dto';
import { PingResult } from './interfaces';

@Injectable()
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

  create(createPodDto: CreatePodDto) {
    return 'This action adds a new pod';
  }

  findAll() {
    return `This action returns all pod`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pod`;
  }

  update(id: number, updatePodDto: UpdatePodDto) {
    return `This action updates a #${id} pod`;
  }

  remove(id: number) {
    return `This action removes a #${id} pod`;
  }

  getUrl(method: string, host?: string): string {
    return `${this.protocol}://${host || this.host}:${this.port}/${method}`;
  }

  async ping(host?: string) {
    try {
      const pingResponse = await this.httpService.axiosRef.get<PingResult>(
        this.getUrl('ping', host),
      );

      return { isPod: true, host };
    } catch (error) {
      console.log(`Host ${host} is not a pod.`, error);
      return { isPod: false, host };
    }
  }
}
