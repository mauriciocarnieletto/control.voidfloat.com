import { Module } from '@nestjs/common';
import { ServerConfigurationService } from './server-configuration.service';
import { ServerConfigurationController } from './server-configuration.controller';
import { serverConfigurationProviders } from './server-configuration.providers';
import { DatabaseModule } from 'src/database/database.module';
import { NetworkModule } from 'src/network/network.module';

@Module({
  controllers: [ServerConfigurationController],
  imports: [DatabaseModule, NetworkModule],
  providers: [...serverConfigurationProviders, ServerConfigurationService],
  exports: [ServerConfigurationService],
})
export class ServerConfigurationModule {}
