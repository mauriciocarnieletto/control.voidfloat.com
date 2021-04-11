import { Test, TestingModule } from '@nestjs/testing';
import { ServerConfigurationController } from './server-configuration.controller';
import { ServerConfigurationService } from './server-configuration.service';

describe('ServerConfigurationController', () => {
  let controller: ServerConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerConfigurationController],
      providers: [ServerConfigurationService],
    }).compile();

    controller = module.get<ServerConfigurationController>(ServerConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
