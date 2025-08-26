import { Test, TestingModule } from '@nestjs/testing';
import { MailesManagementService } from './mailes-management.service';

describe('MailesManagementService', () => {
  let service: MailesManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailesManagementService],
    }).compile();

    service = module.get<MailesManagementService>(MailesManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
