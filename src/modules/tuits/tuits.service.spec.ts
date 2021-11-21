import { Test, TestingModule } from '@nestjs/testing';
import { TuitsService } from './tuits.service';

describe('TuitsService', () => {
  let service: TuitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuitsService],
    }).compile();

    service = module.get<TuitsService>(TuitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
