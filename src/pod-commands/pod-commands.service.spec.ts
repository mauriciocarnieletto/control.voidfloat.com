import { Test, TestingModule } from '@nestjs/testing';
import { PodCommandsService } from './pod-commands.service';

describe('PodCommandsService', () => {
  let service: PodCommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodCommandsService],
    }).compile();

    service = module.get<PodCommandsService>(PodCommandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
