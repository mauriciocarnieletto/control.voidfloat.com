import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PodService } from './pod.service';
import { PodController } from './pod.controller';
import { DatabaseModule } from 'src/database/database.module';
import { podProviders } from './pod.providers';
import configuration from 'src/config/configuration';
import { PodCommunicationModule } from 'src/pod-communication/pod-communication.module';

@Module({
  controllers: [PodController],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    PodCommunicationModule,
  ],
  providers: [...podProviders, PodService],
  exports: [PodService],
})
export class PodModule {}
