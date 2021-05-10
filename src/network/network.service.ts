import { Inject, Injectable } from '@nestjs/common';
import * as os from 'os';
import * as network from 'network';
import { ScannerService } from './scanner/scanner.service';
import { netmaskTable } from './constants';
import { NetworkInterface } from './interfaces';
import { Repository } from 'typeorm';
import { ServerConfiguration } from 'src/server-configuration/entities/server-configuration.entity';

@Injectable()
export class NetworkService {
  constructor(
    private scannerService: ScannerService,
    @Inject('SERVER_CONFIGURATION_REPOSITORY')
    private serverConfigurationRepository: Repository<ServerConfiguration>,
  ) {}

  getSSHPort() {
    return process.env.SSH_PORT;
  }

  async getHostName() {
    return os.hostname();
  }

  getNetworkInterfaces(): Promise<NetworkInterface[]> {
    return new Promise((resolve, reject) => {
      network.get_interfaces_list(
        (error, networkInterfaces: NetworkInterface[]) => {
          if (error) reject(error);
          resolve(networkInterfaces);
        },
      );
    });
  }

  getActiveInterface(): Promise<NetworkInterface> {
    return new Promise((resolve, reject) => {
      network.get_active_interface(
        (error, networkInterface: NetworkInterface) => {
          if (error) reject(error);
          resolve(networkInterface);
        },
      );
    });
  }

  async getGateway(): Promise<string> {
    return new Promise((resolve, reject) => {
      network.get_gateway_ip((error, ip) => {
        if (error) reject(error);
        resolve(ip);
      });
    });
  }

  async getSubnet(): Promise<string> {
    const networkInterface = await this.getActiveInterface();
    const subnetMask = netmaskTable.find(
      (n) => n.netmask === networkInterface.netmask,
    );
    const ipPrefix = networkInterface.gateway_ip.split('.');
    ipPrefix.pop();
    return `${ipPrefix.join('.')}.0${subnetMask.bar}`;
  }

  async getPublicIp(): Promise<string> {
    return new Promise((resolve, reject) => {
      network.get_public_ip((error, ip) => {
        if (error) reject(error);
        resolve(ip);
      });
    });
  }

  async getLocalIp(): Promise<string> {
    return new Promise((resolve, reject) => {
      network.get_private_ip((error, ip) => {
        if (error) reject(error);
        resolve(ip);
      });
    });
  }

  getInternetConnectionStatus(): Promise<boolean> {
    return new Promise((resolve) => {
      this.getPublicIp()
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  async searchPods() {
    const configuration = await this.serverConfigurationRepository.findOne();
    const devices = await this.scannerService.scanNetwork(configuration.subnet);
    return devices;
  }
}
