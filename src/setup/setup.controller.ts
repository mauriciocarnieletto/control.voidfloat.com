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
import { SetupService } from './setup.service';
import { CreateSetupDto } from './dto/create-setup.dto';
import { UpdateSetupDto } from './dto/update-setup.dto';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { ClientService } from 'src/client/client.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('setup')
export class SetupController {
  constructor(
    private readonly setupService: SetupService,
    private clientService: ClientService,
    private usersService: UsersService,
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
  getServerInitialData() {
    return this.setupService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/server')
  setServerData() {
    return this.setupService.findAll();
  }
}
