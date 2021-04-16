import { Module } from '@nestjs/common';
import { PodCommunicationModule } from 'src/pod-communication/pod-communication.module';
import { PodModule } from 'src/pod/pod.module';
import { BackgroundServiceService } from './background-service.service';

@Module({
  providers: [BackgroundServiceService],
  imports: [PodCommunicationModule, PodModule],
})
export class BackgroundServiceModule {}
