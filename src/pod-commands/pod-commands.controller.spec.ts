import { Test, TestingModule } from '@nestjs/testing';
import { PodCommandsController } from './pod-commands.controller';
import { PodCommandsService } from './pod-commands.service';

describe('PodCommandsController', () => {
  let controller: PodCommandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodCommandsController],
      providers: [PodCommandsService],
    }).compile();

    controller = module.get<PodCommandsController>(PodCommandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
