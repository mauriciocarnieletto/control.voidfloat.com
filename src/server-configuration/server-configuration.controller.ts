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
import { ServerConfigurationService } from './server-configuration.service';
import { CreateServerConfigurationDto } from './dto/create-server-configuration.dto';
import { UpdateServerConfigurationDto } from './dto/update-server-configuration.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('server-configuration')
export class ServerConfigurationController {
  constructor(
    private readonly serverConfigurationService: ServerConfigurationService,
  ) {}

  @Get('/os-data')
  findOSData() {
    return this.serverConfigurationService.findOSData();
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createServerConfigurationDto: CreateServerConfigurationDto) {
    return this.serverConfigurationService.create(createServerConfigurationDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.serverConfigurationService.find();
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServerConfigurationDto: UpdateServerConfigurationDto,
  ) {
    return this.serverConfigurationService.update(
      +id,
      updateServerConfigurationDto,
    );
  }
}
