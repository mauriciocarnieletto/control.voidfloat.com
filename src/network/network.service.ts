import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { ScannerService } from './scanner/scanner.service';

@Injectable()
export class NetworkService {
  interface: NodeJS.Dict<os.NetworkInterfaceInfo[]>;
  hostname: string;
  ip: {
    public: string;
    local: string;
  };

  gateway: string;

  constructor(private scannerService: ScannerService) {
    // this.updateInfo();
  }
  /**
   * Updates device network info.
   */
  async updateInfo() {
    this.interface = os.networkInterfaces();
    this.hostname = os.hostname();
    const devices = await this.scannerService.scan();
    console.log(devices);
  }
}
