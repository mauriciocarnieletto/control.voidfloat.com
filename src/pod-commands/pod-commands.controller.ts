import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PodCommandsService } from './pod-commands.service';
import { CreatePodCommandDto } from './dto/create-pod-command.dto';
import { UpdatePodCommandDto } from './dto/update-pod-command.dto';

@Controller('pod-commands')
export class PodCommandsController {
  constructor(private readonly podCommandsService: PodCommandsService) {}

  @Post()
  create(@Body() createPodCommandDto: CreatePodCommandDto) {
    return this.podCommandsService.create(createPodCommandDto);
  }

  @Get()
  findAll() {
    return this.podCommandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podCommandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePodCommandDto: UpdatePodCommandDto) {
    return this.podCommandsService.update(+id, updatePodCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podCommandsService.remove(+id);
  }
}
