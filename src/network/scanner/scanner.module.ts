import { Module } from '@nestjs/common';
import { PodCommunicationModule } from 'src/pod-communication/pod-communication.module';
import { PodModule } from 'src/pod/pod.module';
import { ScannerService } from './scanner.service';

@Module({
  imports: [PodModule, PodCommunicationModule],
  providers: [ScannerService],
  exports: [ScannerService],
})
export class ScannerModule {}
