import { Test, TestingModule } from '@nestjs/testing';
import { PodCommunicationController } from './pod-communication.controller';
import { PodCommunicationService } from './pod-communication.service';

describe('PodCommunicationController', () => {
  let controller: PodCommunicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodCommunicationController],
      providers: [PodCommunicationService],
    }).compile();

    controller = module.get<PodCommunicationController>(PodCommunicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
