import { Test, TestingModule } from '@nestjs/testing';
import { GradesManagementService } from './grades_management.service';

describe('GradesManagementService', () => {
  let service: GradesManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradesManagementService],
    }).compile();

    service = module.get<GradesManagementService>(GradesManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
