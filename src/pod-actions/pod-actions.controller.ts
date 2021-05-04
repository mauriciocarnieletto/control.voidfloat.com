import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PodActionsService } from './pod-actions.service';
import { CreatePodActionDto } from './dto/create-pod-action.dto';
import { UpdatePodActionDto } from './dto/update-pod-action.dto';

@Controller('pod-actions')
export class PodActionsController {
  constructor(private readonly podActionsService: PodActionsService) {}

  @Post()
  create(@Body() createPodActionDto: CreatePodActionDto) {
    return this.podActionsService.create(createPodActionDto);
  }

  @Get()
  findAll() {
    return this.podActionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podActionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePodActionDto: UpdatePodActionDto,
  ) {
    return this.podActionsService.update(+id, updatePodActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podActionsService.remove(+id);
  }
}
