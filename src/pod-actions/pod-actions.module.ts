import { Module } from '@nestjs/common';
import { PodActionsService } from './pod-actions.service';
import { PodActionsController } from './pod-actions.controller';
import { podActionsFieldsProviders } from './pod-actions.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PodActionsController],
  imports: [DatabaseModule],
  exports: [PodActionsService],
  providers: [...podActionsFieldsProviders, PodActionsService],
})
export class PodActionsModule {}
