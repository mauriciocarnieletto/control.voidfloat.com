import { Test, TestingModule } from '@nestjs/testing';
import { PodConfigurationFieldsService } from './pod-configuration-fields.service';

describe('PodConfigurationFieldsService', () => {
  let service: PodConfigurationFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodConfigurationFieldsService],
    }).compile();

    service = module.get<PodConfigurationFieldsService>(PodConfigurationFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
