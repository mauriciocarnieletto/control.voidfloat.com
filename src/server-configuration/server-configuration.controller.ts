import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServerConfigurationService } from './server-configuration.service';
import { CreateServerConfigurationDto } from './dto/create-server-configuration.dto';
import { UpdateServerConfigurationDto } from './dto/update-server-configuration.dto';

@Controller('server-configuration')
export class ServerConfigurationController {
  constructor(private readonly serverConfigurationService: ServerConfigurationService) {}

  @Post()
  create(@Body() createServerConfigurationDto: CreateServerConfigurationDto) {
    return this.serverConfigurationService.create(createServerConfigurationDto);
  }

  @Get()
  findAll() {
    return this.serverConfigurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverConfigurationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerConfigurationDto: UpdateServerConfigurationDto) {
    return this.serverConfigurationService.update(+id, updateServerConfigurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverConfigurationService.remove(+id);
  }
}
