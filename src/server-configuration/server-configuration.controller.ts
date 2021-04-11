import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServerConfigurationService } from './server-configuration.service';
import { CreateServerConfigurationDto } from './dto/create-server-configuration.dto';
import { UpdateServerConfigurationDto } from './dto/update-server-configuration.dto';

@Controller('server-configuration')
export class ServerConfigurationController {
  constructor(
    private readonly serverConfigurationService: ServerConfigurationService,
  ) {}

  @Get('/os-data')
  findOSData() {
    return this.serverConfigurationService.findOSData();
  }

  @Post()
  create(@Body() createServerConfigurationDto: CreateServerConfigurationDto) {
    return this.serverConfigurationService.create(createServerConfigurationDto);
  }

  @Get()
  findAll() {
    return this.serverConfigurationService.find();
  }

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
