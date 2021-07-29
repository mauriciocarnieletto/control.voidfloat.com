import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PodCommandDTO } from 'src/pod-configuration-commands/entities/pod-configuration-command.entity';

import { PodCommunicationService } from './pod-communication.service';

@Controller('pod-communication')
export class PodCommunicationController {
  constructor(
    private readonly podCommunicationService: PodCommunicationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/action/:podId/:actionId')
  executeAction(
    @Param('podId') podId: string,
    @Param('actionId') actionId: string,
    @Body() data: any,
  ) {
    return this.podCommunicationService.executeAction(podId, actionId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/command/:podId')
  executeCommand(
    @Param('podId') podId: string,
    @Body() command: PodCommandDTO,
  ) {
    return this.podCommunicationService.sendCommandToPod(podId, command);
  }
}
