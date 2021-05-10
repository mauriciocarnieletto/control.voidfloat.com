import { HttpModule, Module } from '@nestjs/common';
import { PodCommunicationService } from './pod-communication.service';
import { PodCommunicationController } from './pod-communication.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { PodModule } from 'src/pod/pod.module';
import { serverConfigurationProviders } from 'src/server-configuration/server-configuration.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PodCommunicationController],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      headers: { 'Content-type': 'application/json' },
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PodModule,
    DatabaseModule,
  ],
  providers: [PodCommunicationService, ...serverConfigurationProviders],
  exports: [PodCommunicationService],
})
export class PodCommunicationModule {}
