import { Test, TestingModule } from '@nestjs/testing';
import { PodConfigurationCommandsController } from './pod-configuration-commands.controller';
import { PodConfigurationCommandsService } from './pod-configuration-commands.service';

describe('PodConfigurationCommandsController', () => {
  let controller: PodConfigurationCommandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodConfigurationCommandsController],
      providers: [PodConfigurationCommandsService],
    }).compile();

    controller = module.get<PodConfigurationCommandsController>(PodConfigurationCommandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
