import { Inject, Injectable } from '@nestjs/common';
import { NetworkService } from 'src/network/network.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreateServerConfigurationDto } from './dto/create-server-configuration.dto';
import { UpdateServerConfigurationDto } from './dto/update-server-configuration.dto';
import { ServerConfiguration } from './entities/server-configuration.entity';

@Injectable()
export class ServerConfigurationService {
  constructor(
    @Inject('SERVER_CONFIGURATION_REPOSITORY')
    private serverConfigurationRepository: Repository<ServerConfiguration>,
    private networkService: NetworkService,
  ) {}

  getNetworkData() {
    return { hostname: '', gateway: '', sshPort: '' };
  }

  create(createServerConfigurationDto: CreateServerConfigurationDto) {
    return 'This action adds a new serverConfiguration';
  }

  findAll() {
    return `This action returns all serverConfiguration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serverConfiguration`;
  }

  update(
    id: number,
    updateServerConfigurationDto: UpdateServerConfigurationDto,
  ) {
    return `This action updates a #${id} serverConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} serverConfiguration`;
  }
}
