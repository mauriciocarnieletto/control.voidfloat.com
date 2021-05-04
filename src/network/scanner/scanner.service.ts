import { Injectable } from '@nestjs/common';
import { getIPRange } from 'get-ip-range';
import { promise as ping } from 'ping';
import { PodCommunicationService } from 'src/pod-communication/pod-communication.service';
import { DeviceI } from '../entities/device.interface';

@Injectable()
export class ScannerService {
  constructor(private podCommunicationService: PodCommunicationService) {}
  /**
   * Sends a ping to all servers to update the arp table.
   */
  async pingDevices(
    devicesIps: string[],
  ): Promise<{ ip: string; isAlive: boolean }[]> {
    const serversCount = devicesIps.length;
    let progressCount = 0;
    return Promise.all<{ ip: string; isAlive: boolean }>(
      devicesIps.map((deviceIp) => {
        return new Promise((resolve, reject) => {
          progressCount = 1 + progressCount;
          console.log(`Pinging ${progressCount} of ${serversCount}`);
          this.ping(deviceIp)
            .then((data) => {
              resolve({ ip: deviceIp, isAlive: data.alive });
            })
            .catch(reject);
        });
      }),
    );
  }

  async ping(address: string) {
    return ping.probe(address);
  }

  async getLocalDevices(subnet: string) {
    const networkIps = await getIPRange(subnet);
    const pingedDevices = await this.pingDevices(networkIps);
    return pingedDevices.filter(({ isAlive }) => isAlive);
  }

  async filterPodsFromDevices(devices: DeviceI[]) {
    return Promise.all(
      devices.map(({ ip }) => this.podCommunicationService.pingHost(ip)),
    ).then((pingedDevices) =>
      pingedDevices.filter(
        (device) => device.isPod && device.screen && device.screen.status,
      ),
    );
  }

  async scanNetwork(subnet: string) {
    const localDevices = await this.getLocalDevices(subnet);
    const devices = localDevices.map(
      ({ ip }) =>
        ({
          ip,
          name: ip,
        } as DeviceI),
    );
    const podDevices = await this.filterPodsFromDevices(devices);
    return podDevices;
  }
}
