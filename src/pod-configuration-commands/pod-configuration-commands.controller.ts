import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PodConfigurationCommandsService } from './pod-configuration-commands.service';
import { CreatePodConfigurationCommandDto } from './dto/create-pod-configuration-command.dto';
import { UpdatePodConfigurationCommandDto } from './dto/update-pod-configuration-command.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('pod-configuration-commands')
export class PodConfigurationCommandsController {
  constructor(
    private readonly podConfigurationCommandsService: PodConfigurationCommandsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPodConfigurationCommandDto: CreatePodConfigurationCommandDto,
  ) {
    return this.podConfigurationCommandsService.create(
      createPodConfigurationCommandDto,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.podConfigurationCommandsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podConfigurationCommandsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podConfigurationCommandsService.remove(+id);
  }
}
