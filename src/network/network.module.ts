import { Module } from '@nestjs/common';
import { ScannerModule } from './scanner/scanner.module';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';

@Module({
  imports: [ScannerModule],
  providers: [NetworkService],
  exports: [NetworkService],
  controllers: [NetworkController],
})
export class NetworkModule {}
