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

  async findOSData() {
    const activeNetworkInterface = await this.networkService.getActiveInterface();
    const networkInterfaces = await this.networkService.getNetworkInterfaces();
    const hostname = await this.networkService.getHostName();
    const gatewayIp = await this.networkService.getGateway();
    const localIp = await this.networkService.getLocalIp();
    const sshPort = await this.networkService.getSSHPort();
    const publicIp = await this.networkService.getPublicIp();
    const subnet = await this.networkService.getSubnet();
    const isOnline = await this.networkService.getInternetConnectionStatus();

    return {
      hostname,
      localIp,
      gatewayIp,
      publicIp,
      subnet,
      sshPort,
      activeNetworkInterface,
      networkInterfaces,
      isOnline,
    };
  }

  async create(createServerConfigurationDto: CreateServerConfigurationDto) {
    const existentServerConfigurations = await this.find();

    if (existentServerConfigurations.length > 0)
      throw new Error('Já existe uma configuração para o servidor');

    const serverConfiguration = new ServerConfiguration();
    Object.assign(serverConfiguration, createServerConfigurationDto);
    return this.serverConfigurationRepository.save(serverConfiguration);
  }

  find() {
    return this.serverConfigurationRepository.find();
  }

  update(
    id: number,
    updateServerConfigurationDto: UpdateServerConfigurationDto,
  ) {
    return this.serverConfigurationRepository.update(
      id,
      updateServerConfigurationDto,
    );
  }
}
