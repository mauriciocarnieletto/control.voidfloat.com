import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SetupService } from './setup.service';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { ClientService } from 'src/client/client.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ServerConfigurationService } from 'src/server-configuration/server-configuration.service';

@Controller('setup')
export class SetupController {
  constructor(
    private readonly setupService: SetupService,
    private clientService: ClientService,
    private usersService: UsersService,
    private serverConfigurationService: ServerConfigurationService,
  ) {}

  @Get('/start')
  async startSetup() {
    return {};
  }

  @Post('/client')
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Patch('/client')
  updateClient(@Body() updateClientData: CreateClientDto) {
    return this.clientService.update(updateClientData.id, updateClientData);
  }

  @Post('/user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('/user')
  updateUser(@Body() updateUserDto: CreateUserDto) {
    return this.clientService.update(updateUserDto.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/server')
  async getServerInitialData(@Request() req) {
    const serverConfigurations = await this.serverConfigurationService.find();
    if (serverConfigurations?.length === 0) {
      const {
        hostname,
        publicIp,
        gatewayIp,
        localIp,
        subnet,
        sshPort,
      } = await this.serverConfigurationService.findOSData();
      return this.serverConfigurationService.create({
        clientId: req.user.clientId,
        hostname,
        publicIp,
        gatewayIp,
        localIp,
        subnet,
        sshPort,
      });
    }
    return serverConfigurations[0];
  }

  @UseGuards(JwtAuthGuard)
  @Post('/server')
  setServerData() {
    return this.setupService.findAll();
  }
}
