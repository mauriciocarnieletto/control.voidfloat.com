import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PodService } from './pod.service';
import { CreatePodDto } from './dto/create-pod.dto';
import { UpdatePodDto } from './dto/update-pod.dto';

@Controller('pod')
export class PodController {
  constructor(private readonly podService: PodService) {}

  @Post()
  create(@Body() createPodDto: CreatePodDto) {
    return this.podService.create(createPodDto);
  }

  @Get()
  findAll() {
    return this.podService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePodDto: UpdatePodDto) {
    return this.podService.update(+id, updatePodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podService.remove(+id);
  }
}
