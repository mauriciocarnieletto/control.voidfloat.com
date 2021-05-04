import { Test, TestingModule } from '@nestjs/testing';
import { PodActionsController } from './pod-actions.controller';
import { PodActionsService } from './pod-actions.service';

describe('PodActionsController', () => {
  let controller: PodActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodActionsController],
      providers: [PodActionsService],
    }).compile();

    controller = module.get<PodActionsController>(PodActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
