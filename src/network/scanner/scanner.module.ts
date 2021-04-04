import { Module } from '@nestjs/common';
import { PodModule } from 'src/pod/pod.module';
import { ScannerService } from './scanner.service';

@Module({
  imports: [PodModule],
  providers: [ScannerService],
  exports: [ScannerService],
})
export class ScannerModule {}
