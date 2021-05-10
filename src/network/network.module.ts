import { Module } from '@nestjs/common';
import { ScannerModule } from './scanner/scanner.module';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { serverConfigurationProviders } from 'src/server-configuration/server-configuration.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ScannerModule, DatabaseModule],
  providers: [NetworkService, ...serverConfigurationProviders],
  exports: [NetworkService],
  controllers: [NetworkController],
})
export class NetworkModule {}
