import { Test, TestingModule } from '@nestjs/testing';
import { PodCommunicationService } from './pod-communication.service';

describe('PodCommunicationService', () => {
  let service: PodCommunicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodCommunicationService],
    }).compile();

    service = module.get<PodCommunicationService>(PodCommunicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
