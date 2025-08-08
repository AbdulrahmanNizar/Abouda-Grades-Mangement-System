import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsManagementService } from './subjects-management.service';

describe('SubjectsManagementService', () => {
  let service: SubjectsManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectsManagementService],
    }).compile();

    service = module.get<SubjectsManagementService>(SubjectsManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
