import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PodConfigurationFieldsService } from './pod-configuration-fields.service';
import { CreatePodConfigurationFieldDto } from './dto/create-pod-configuration-field.dto';
import { UpdatePodConfigurationFieldDto } from './dto/update-pod-configuration-field.dto';

@Controller('pod-configuration-fields')
export class PodConfigurationFieldsController {
  constructor(
    private readonly podConfigurationFieldsService: PodConfigurationFieldsService,
  ) {}

  @Post()
  create(
    @Body() createPodConfigurationFieldDto: CreatePodConfigurationFieldDto,
  ) {
    return this.podConfigurationFieldsService.create(
      createPodConfigurationFieldDto,
    );
  }

  @Get()
  findAll() {
    return this.podConfigurationFieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podConfigurationFieldsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePodConfigurationFieldDto: UpdatePodConfigurationFieldDto,
  ) {
    return this.podConfigurationFieldsService.update(
      +id,
      updatePodConfigurationFieldDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podConfigurationFieldsService.remove(+id);
  }
}
