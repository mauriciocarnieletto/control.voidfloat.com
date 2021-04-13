import { Test, TestingModule } from '@nestjs/testing';
import { PodConfigurationCommandsService } from './pod-configuration-commands.service';

describe('PodConfigurationCommandsService', () => {
  let service: PodConfigurationCommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodConfigurationCommandsService],
    }).compile();

    service = module.get<PodConfigurationCommandsService>(PodConfigurationCommandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
