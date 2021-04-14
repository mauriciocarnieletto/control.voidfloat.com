import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundServiceService } from './background-service.service';

describe('BackgroundServiceService', () => {
  let service: BackgroundServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundServiceService],
    }).compile();

    service = module.get<BackgroundServiceService>(BackgroundServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
