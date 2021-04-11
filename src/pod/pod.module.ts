import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PodService } from './pod.service';
import { PodController } from './pod.controller';
import { CommunicationModule } from './communication/communication.module';
import { DatabaseModule } from 'src/database/database.module';
import { podProviders } from './pod.providers';
import configuration from 'src/config/configuration';

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
    CommunicationModule,
  ],
  providers: [...podProviders, PodService],
  exports: [PodService],
})
export class PodModule {}
