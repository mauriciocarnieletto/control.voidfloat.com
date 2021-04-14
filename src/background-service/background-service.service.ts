import { Injectable, Logger } from '@nestjs/common';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { PodCommunicationService } from 'src/pod-communication/pod-communication.service';

@Injectable()
export class BackgroundServiceService {
  private readonly logger = new Logger(BackgroundServiceService.name);

  logsTable: {
    time: Date;
    name: string;
    status: string;
    ended: boolean;
    memoryUsage: number;
  }[] = [];

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private podCommunicationService: PodCommunicationService,
  ) {}

  handleException(error: Error) {
    console.log(error);
    this.logger.error('There was an error');
  }

  @Interval('jobHandler', 1000)
  handleCron() {
    console.table(this.logsTable);
    this.podCommunicationService.ping('localhost').then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('pinged host every 2 seconds', response.data);
    });
    this.task('every two', 300, 2000);
  }

  @Interval('setPodsConfig', Number(process.env.UPDATE_PODS_STATUS_EACH))
  setPodsConfig() {
    this.podCommunicationService.ping('localhost').then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('setPodsConfig', response.data.sessionStatus);
    });
    this.task('setPodsConfig', 2000, 10000);
  }

  @Interval('updatePodsStatus', Number(process.env.UPDATE_PODS_STATUS_EACH))
  updatePodsStatus() {
    this.podCommunicationService.ping('localhost').then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('updatePodsStatus', response.data.sessionStatus);
    });
    this.task('updatePodsStatus', 2000, 10000);
  }

  runningJobs: { [key: string]: { isRunning: boolean } } = {};
  shouldThrow = true;
  async task(name: string, timeError: number, timeSuccess: number) {
    if (this.runningJobs[name] && this.runningJobs[name].isRunning) {
      console.log(name, 'Job will not start cuz it is running');
      return;
    }
    this.runningJobs[name] = { isRunning: true };
    try {
      await this.promise(4000).then(() => {
        if (this.shouldThrow) {
          this.shouldThrow = false;
          throw new Error();
        } else {
          this.shouldThrow = true;
        }
      });
      await this.promise(5000);
      this.runningJobs[name] = { isRunning: false };
    } catch {
      this.runningJobs[name] = { isRunning: false };
      this.logsTable.push({
        time: new Date(),
        name,
        status: 'error',
        ended: true,
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
      });
      return;
    }
    this.logsTable.push({
      time: new Date(),
      name,
      status: 'succes',
      ended: true,
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
    });
  }

  async promise(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }
}
