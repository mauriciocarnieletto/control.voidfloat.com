import { Module } from '@nestjs/common';
import { PodCommandsService } from './pod-commands.service';
import { PodCommandsController } from './pod-commands.controller';

@Module({
  controllers: [PodCommandsController],
  providers: [PodCommandsService]
})
export class PodCommandsModule {}
