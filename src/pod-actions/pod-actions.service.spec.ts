import { Test, TestingModule } from '@nestjs/testing';
import { PodActionsService } from './pod-actions.service';

describe('PodActionsService', () => {
  let service: PodActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodActionsService],
    }).compile();

    service = module.get<PodActionsService>(PodActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
