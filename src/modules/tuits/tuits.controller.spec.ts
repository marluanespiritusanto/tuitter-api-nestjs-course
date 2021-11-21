import { Test, TestingModule } from '@nestjs/testing';
import { TuitsController } from './tuits.controller';

describe('TuitsController', () => {
  let controller: TuitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuitsController],
    }).compile();

    controller = module.get<TuitsController>(TuitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
