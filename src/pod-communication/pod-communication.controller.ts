import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PodCommunicationService } from './pod-communication.service';
import { CreatePodCommunicationDto } from './dto/create-pod-communication.dto';
import { UpdatePodCommunicationDto } from './dto/update-pod-communication.dto';

@Controller('pod-communication')
export class PodCommunicationController {
  constructor(private readonly podCommunicationService: PodCommunicationService) {}

  @Post()
  create(@Body() createPodCommunicationDto: CreatePodCommunicationDto) {
    return this.podCommunicationService.create(createPodCommunicationDto);
  }

  @Get()
  findAll() {
    return this.podCommunicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podCommunicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePodCommunicationDto: UpdatePodCommunicationDto) {
    return this.podCommunicationService.update(+id, updatePodCommunicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podCommunicationService.remove(+id);
  }
}
