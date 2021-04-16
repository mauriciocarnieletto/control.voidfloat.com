import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PodService } from './pod.service';
import { PodController } from './pod.controller';
import { DatabaseModule } from 'src/database/database.module';
import { podProviders } from './pod.providers';
import configuration from 'src/config/configuration';
import { PodGateway } from './pod.gateway';

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
  ],
  providers: [...podProviders, PodService, PodGateway],
  exports: [PodService],
})
export class PodModule {}
