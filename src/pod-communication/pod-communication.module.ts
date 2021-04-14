import { HttpModule, Module } from '@nestjs/common';
import { PodCommunicationService } from './pod-communication.service';
import { PodCommunicationController } from './pod-communication.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  controllers: [PodCommunicationController],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [PodCommunicationService],
  exports: [PodCommunicationService],
})
export class PodCommunicationModule {}
