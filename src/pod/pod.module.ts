import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PodService } from './pod.service';
import { PodController } from './pod.controller';
import { CommunicationModule } from './communication/communication.module';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CommunicationModule,
  ],
  controllers: [PodController],
  providers: [PodService],
  exports: [PodService],
})
export class PodModule {}
