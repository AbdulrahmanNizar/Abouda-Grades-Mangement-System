import { Test, TestingModule } from '@nestjs/testing';
import { ChangePasswordLinksManagementService } from './change-password-links-management.service';

describe('ChangePasswordLinksManagementService', () => {
  let service: ChangePasswordLinksManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangePasswordLinksManagementService],
    }).compile();

    service = module.get<ChangePasswordLinksManagementService>(ChangePasswordLinksManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
