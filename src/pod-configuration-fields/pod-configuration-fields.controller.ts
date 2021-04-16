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
import { PodConfigurationFieldsService } from './pod-configuration-fields.service';
import { CreatePodConfigurationFieldDto } from './dto/create-pod-configuration-field.dto';
import { UpdatePodConfigurationFieldDto } from './dto/update-pod-configuration-field.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('pod-configuration-fields')
export class PodConfigurationFieldsController {
  constructor(
    private readonly podConfigurationFieldsService: PodConfigurationFieldsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPodConfigurationFieldDto: CreatePodConfigurationFieldDto,
  ) {
    return this.podConfigurationFieldsService.create(
      createPodConfigurationFieldDto,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.podConfigurationFieldsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podConfigurationFieldsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podConfigurationFieldsService.remove(+id);
  }
}
