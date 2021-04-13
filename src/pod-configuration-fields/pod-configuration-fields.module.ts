import { Module } from '@nestjs/common';
import { PodConfigurationFieldsService } from './pod-configuration-fields.service';
import { PodConfigurationFieldsController } from './pod-configuration-fields.controller';
import { DatabaseModule } from 'src/database/database.module';
import { podConfigurationFieldsProviders } from './pod-configuration-fields.providers';

@Module({
  controllers: [PodConfigurationFieldsController],
  imports: [DatabaseModule],
  providers: [
    ...podConfigurationFieldsProviders,
    PodConfigurationFieldsService,
  ],
  exports: [PodConfigurationFieldsService],
})
export class PodConfigurationFieldsModule {}
