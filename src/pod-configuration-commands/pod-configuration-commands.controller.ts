import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PodConfigurationCommandsService } from './pod-configuration-commands.service';
import { CreatePodConfigurationCommandDto } from './dto/create-pod-configuration-command.dto';
import { UpdatePodConfigurationCommandDto } from './dto/update-pod-configuration-command.dto';

@Controller('pod-configuration-commands')
export class PodConfigurationCommandsController {
  constructor(
    private readonly podConfigurationCommandsService: PodConfigurationCommandsService,
  ) {}

  @Post()
  create(
    @Body() createPodConfigurationCommandDto: CreatePodConfigurationCommandDto,
  ) {
    return this.podConfigurationCommandsService.create(
      createPodConfigurationCommandDto,
    );
  }

  @Get()
  findAll() {
    return this.podConfigurationCommandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podConfigurationCommandsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePodConfigurationCommandDto: UpdatePodConfigurationCommandDto,
  ) {
    return this.podConfigurationCommandsService.update(
      +id,
      updatePodConfigurationCommandDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podConfigurationCommandsService.remove(+id);
  }
}
