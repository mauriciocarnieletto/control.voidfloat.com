import { Module } from '@nestjs/common';
import { PodConfigurationCommandsService } from './pod-configuration-commands.service';
import { PodConfigurationCommandsController } from './pod-configuration-commands.controller';
import { podConfigurationCommandsProviders } from './pod-configuration-commands.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PodConfigurationCommandsController],
  imports: [DatabaseModule],
  providers: [
    ...podConfigurationCommandsProviders,
    PodConfigurationCommandsService,
  ],
})
export class PodConfigurationCommandsModule {}
