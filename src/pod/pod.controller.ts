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
import { PodService } from './pod.service';
import { CreatePodDto } from './dto/create-pod.dto';
import { UpdatePodDto } from './dto/update-pod.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('pod')
export class PodController {
  constructor(private readonly podService: PodService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPodDto: CreatePodDto) {
    return this.podService.create(createPodDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.podService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePodDto: UpdatePodDto) {
    return this.podService.update(+id, updatePodDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podService.remove(+id);
  }
}
