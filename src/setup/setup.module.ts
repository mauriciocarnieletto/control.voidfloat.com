import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { SetupController } from './setup.controller';
import { ClientModule } from 'src/client/client.module';
import { UsersModule } from 'src/users/users.module';
import { ServerConfigurationModule } from 'src/server-configuration/server-configuration.module';

@Module({
  imports: [ClientModule, UsersModule, ServerConfigurationModule],
  controllers: [SetupController],
  providers: [SetupService],
})
export class SetupModule {}
