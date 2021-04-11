import { Module } from '@nestjs/common';
import { ScannerModule } from './scanner/scanner.module';
import { NetworkService } from './network.service';

@Module({
  imports: [ScannerModule],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
