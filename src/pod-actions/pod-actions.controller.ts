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
import { PodActionsService } from './pod-actions.service';
import { CreatePodActionDto } from './dto/create-pod-action.dto';
import { UpdatePodActionDto } from './dto/update-pod-action.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('pod-actions')
export class PodActionsController {
  constructor(private readonly podActionsService: PodActionsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPodActionDto: CreatePodActionDto) {
    return this.podActionsService.create(createPodActionDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.podActionsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podActionsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePodActionDto: UpdatePodActionDto,
  ) {
    return this.podActionsService.update(+id, updatePodActionDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podActionsService.remove(+id);
  }
}
