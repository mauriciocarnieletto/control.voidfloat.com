import { Test, TestingModule } from '@nestjs/testing';
import { ServerConfigurationService } from './server-configuration.service';

describe('ServerConfigurationService', () => {
  let service: ServerConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerConfigurationService],
    }).compile();

    service = module.get<ServerConfigurationService>(ServerConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
