import { Test, TestingModule } from '@nestjs/testing';
import { PodConfigurationFieldsController } from './pod-configuration-fields.controller';
import { PodConfigurationFieldsService } from './pod-configuration-fields.service';

describe('PodConfigurationFieldsController', () => {
  let controller: PodConfigurationFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodConfigurationFieldsController],
      providers: [PodConfigurationFieldsService],
    }).compile();

    controller = module.get<PodConfigurationFieldsController>(PodConfigurationFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
