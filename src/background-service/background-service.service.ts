import { Injectable, Logger } from '@nestjs/common';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { PodCommunicationService } from 'src/pod-communication/pod-communication.service';
import { PodService } from 'src/pod/pod.service';
import { createClient, RedisClient } from 'redis';

@Injectable()
export class BackgroundServiceService {
  private readonly logger = new Logger(BackgroundServiceService.name);
  private readonly runningJobs: { [key: string]: { isRunning: boolean } } = {};
  redis: RedisClient;

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
    private podService: PodService,
  ) {
    this.redis = createClient();
  }

  handleException(error: Error) {
    console.log(error);
    this.logger.error('There was an error');
  }

  async getPodsStatusFunction() {
    const pods = await this.podService.findAll();

    const podsStatuses = await Promise.all(
      pods.map(async (pod) => {
        const ping = await this.podCommunicationService.ping(pod.ipAddress);

        return { ...pod, ...ping, time: new Date().getTime() };
      }),
    );

    this.redis.publish('podStatus', JSON.stringify(podsStatuses));
  }

  @Interval('getStatus', Number(process.env.UPDATE_PODS_STATUS_EACH))
  async getStatus() {
    this.taskWrapper('Get Pods Status', this.getPodsStatusFunction());
  }

  async taskWrapper<T>(name: string, task: Promise<T>) {
    if (this.runningJobs[name] && this.runningJobs[name].isRunning) {
      this.logger.debug(`Task ${name} > Is still running. Please, await.`);
      return;
    }
    this.logger.debug(`Task ${name} > Starting`);
    this.runningJobs[name] = { isRunning: true };
    return task
      .then(() => {
        this.runningJobs[name] = { isRunning: false };
        this.logger.debug(`Task ${name} > Ended`);
      })
      .catch(this.handleException);
  }
}
