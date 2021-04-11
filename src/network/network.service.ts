import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as network from 'network';
import { ScannerService } from './scanner/scanner.service';
import { netmaskTable } from './constants';
import { NetworkInterface } from './interfaces';

@Injectable()
export class NetworkService {
  constructor(private scannerService: ScannerService) {}

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

  async updateInfo() {
    const devices = await this.scannerService.scan();
    console.log(devices);
  }
}
