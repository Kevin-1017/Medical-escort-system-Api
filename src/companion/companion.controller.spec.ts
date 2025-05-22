import { Test, TestingModule } from '@nestjs/testing';
import { CompanionController } from './companion.controller';

describe('CompanionController', () => {
  let controller: CompanionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanionController],
    }).compile();

    controller = module.get<CompanionController>(CompanionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
